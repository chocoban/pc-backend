import {
  GraphQLObjectType
} from 'graphql';

import createOrUpdateRequestMutation from './requests';

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addRequest: createOrUpdateRequestMutation(),
    // updateRequest: createOrUpdateRequestMutation()
  }
});

export default Mutation;
