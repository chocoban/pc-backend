import { GraphQLObjectType } from 'graphql';

import {
  createRequestMutation, updateRequestMutation,
  deleteRequestMutation
} from './requests';


const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addRequest: createRequestMutation(),
    updateRequest: updateRequestMutation(),
    deleteRequest: deleteRequestMutation()
  }
});

export default Mutation;
