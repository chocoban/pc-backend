import {
  GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID
} from 'graphql';

import { userType, requestType } from '../types/index';
import resolvers from '../resolvers/index';

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
    request: {
      type: requestType,
      args: {
        id: { type: GraphQLID }
      },
      resolve() {
        return 'requests go here';
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
