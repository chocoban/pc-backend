import { GraphQLID, GraphQLString } from 'graphql';

import { requestType } from '../../types/index';
import resolvers from '../../resolvers/index';
import requestFormValidation from '../../validators/request';

const { requestResolver } = resolvers;

const createOrUpdateRequestMutation = () => ({
  type: requestType,
  args: {
    id: { type: GraphQLID },
    reason: { type: GraphQLString }
  },
  resolve: async (parent, args) => {
    const { id, reason } = args;
    requestFormValidation(reason);
    const newRequest = await requestResolver.createOrUpdateRequest(id, reason);
    return newRequest;
  }
});

export default createOrUpdateRequestMutation;
