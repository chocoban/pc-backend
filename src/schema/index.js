import {
  GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID
} from 'graphql';

import Mutation from './mutations/index';
import { userType } from '../types/index';
import resolvers from '../resolvers/index';
import { singleRequestQuery, allRequestsQuery } from './queries/requests';

const { userResolver } = resolvers;
const { getSingleUser } = userResolver;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        const singleUser = await getSingleUser(args.id);
        return singleUser;
      }

    },
    users: {
      type: new GraphQLList(userType),
      resolve: async () => {
        const allUsers = await userResolver.getAllUsers();
        return allUsers;
      }
    },
    request: singleRequestQuery(),
    requests: allRequestsQuery()
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
