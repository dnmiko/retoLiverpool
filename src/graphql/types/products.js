import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLFloat
} from 'graphql';

export const ProductType = new GraphQLObjectType({
    name: "ListProducts",
    description: "Lista de los productos registrados en la base del Reto Liverpool",
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        price: {
            type: GraphQLFloat
        },
        image_url: {
            type: GraphQLString
        }
    })
});

export const ProductInputType = new GraphQLInputObjectType({
    name: "AddProduct",
    description: "Agrega productos a la base de Reto Liverpool",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        price: {
            type: GraphQLFloat
        },
        image_url: {
            type: GraphQLString
        }
    })
});