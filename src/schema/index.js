import {
  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList
} from 'graphql';

import { UserType } from '../types';
import resolvers from '../resolvers/index';

const { user } = resolvers;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: GraphQLList,
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        const { id } = args;
        return user.getSingleUser(id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
