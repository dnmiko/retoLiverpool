import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';
import Queries from './queries';
import Mutations from './mutations';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: Queries
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: Mutations
    })
})