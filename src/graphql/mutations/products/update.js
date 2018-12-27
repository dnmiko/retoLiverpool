import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';
import Product from '../../../models/products';
import {
    ProductInputType,
    ProductType
} from '../../types/products';

export default {
    type: ProductType,
    args: {
        id: {
            name: "ID",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            type: new GraphQLNonNull(ProductInputType)
        }
    },
    resolve(root, params) {
        return Product.findByIdAndUpdate(params.id, {
            $set: { ...params.data
            }
        }).then((product) => {
            return Product.findById(params.id).exec();
        }).catch((err) => {
            throw new Error("Error al actualizar el producto");
        })
    }
}