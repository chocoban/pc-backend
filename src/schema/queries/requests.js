import { GraphQLID } from 'graphql';

import { requestType } from '../../types/index';
import resolvers from '../../resolvers/index';
// import requestFormValidation from '../../validators/request';

const { requestResolver } = resolvers;

const singleRequestQuery = () => ({
  type: requestType,
  args: {
    id: { type: GraphQLID }
  },
  resolve: async (parent, args) => {
    // requestFormValidation(context, args.formData);
    const singleRequest = await requestResolver.getSingleRequest(args.id);
    return singleRequest;
  }
});

export default singleRequestQuery;
