import { GraphQLID, GraphQLList } from 'graphql';
import { validator, validate } from 'graphql-validation';

import { requestType } from '../../types/index';
import resolvers from '../../resolvers/index';

const { requestResolver } = resolvers;

export const singleRequestQuery = () => ({
  type: requestType,
  args: { id: { type: GraphQLID } },
  resolve: validator([
    validate('id')
      .not().isEmpty({ msg: 'The Id is required' })
  ], async (parent, args, context) => {
    if (context.validationErrors) {
      return context.validationErrors;
    }
    const singleRequest = await requestResolver.getSingleRequest(args.id);
    return singleRequest;
  })
});

export const allRequestsQuery = () => ({
  type: new GraphQLList(requestType),
  resolve: async () => {
    const allRequests = await requestResolver.getAllRequests();
    return allRequests;
  }
});
