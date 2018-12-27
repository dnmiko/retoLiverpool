import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLNonNull
} from 'graphql';

//Type para un query de listado
export const UserType = new GraphQLObjectType({
    name: "ListUsers",
    description: "Lista de los usuarios en la base del Reto Liverpool",
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        is_admin: {
            type: GraphQLBoolean
        },
        created_at: {
            type: GraphQLString
        },
        is_active: {
            type: GraphQLBoolean
        }
    })
});

export const UserInputType = new GraphQLInputObjectType({
    name: "AddUsers",
    description: "Datos que puede modificar un usuario sin necesidad de ser administrador",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }

    })
});