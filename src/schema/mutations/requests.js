import {
  GraphQLID, GraphQLString, GraphQLInt
} from 'graphql';
import { validator, validate } from 'graphql-validation';

import { requestType } from '../../types/index';
import resolvers from '../../resolvers/index';
import { verifyToken } from '../../utils/authUtils';
import CustomError from '../../helpers/errorHandler/customError';

const { requestResolver } = resolvers;

export const createRequestMutation = () => ({
  type: requestType,
  args: {
    amount: { type: GraphQLInt },
    reason: { type: GraphQLString },
    payment: { type: GraphQLString }
  },
  resolve: validator([
    validate('amount')
      .not().isEmpty({ msg: 'The amount is required' }),
    validate('reason')
      .not().isEmpty({ msg: 'The reason is required' })
      .isLength({ msg: 'The reason is invalid', options: { min: 10 } }),
    validate('payment')
      .not().isEmpty({ msg: 'The payment is required' })

  ], async (parent, args, context) => {
    try {
      if (context.validationErrors) {
        const errMsg = context.validationErrors;
        throw new CustomError('BAD_REQUEST', errMsg);
      }
      const {
        amount, reason, payment
      } = args;
      // const author = verifyToken();
      const authorId = 1;
      const dupe = await requestResolver.duplicateRequest(amount, reason, payment, authorId);
      if (dupe) return dupe;
      const newRequest = await requestResolver.createRequest(amount, reason, payment, authorId);
      return newRequest;
    } catch (err) {
      return err;
    }
  })
});

export const updateRequestMutation = () => ({
  type: requestType,
  args: {
    id: { type: GraphQLID },
    amount: { type: GraphQLInt },
    reason: { type: GraphQLString },
    payment: { type: GraphQLString }
  },
  resolve: async (parent, args) => {
    const {
      id, amount, reason, payment
    } = args;
    const author = verifyToken();
    const updatingAuthorId = author.id;
    const updatedRequest = await requestResolver.updateRequest(
      id, amount, reason, payment, updatingAuthorId
    );
    return updatedRequest;
  }
});

export const deleteRequestMutation = () => ({
  type: GraphQLString,
  args: {
    id: { type: GraphQLID }
  },
  resolve: async (parent, args) => {
    const { id } = args;
    await requestResolver.deleteRequest(id);
    return 'Delete comfirmed!';
  }
});
