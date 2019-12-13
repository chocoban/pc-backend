import {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt,
} from 'graphql';

import resolvers from '../resolvers';

const { userResolver } = resolvers;

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

export const requestType = new GraphQLObjectType({
  name: 'Request',
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLInt },
    reason: { type: GraphQLString },
    payment: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: userType,
      resolve: (parent) => {
        const { authorId } = parent;
        return userResolver.getSingleUser(authorId);
      }
    }
  })
});
