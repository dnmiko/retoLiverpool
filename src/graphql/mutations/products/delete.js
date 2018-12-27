import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';
import Product from '../../../models/products';
import {
    ProductType
} from '../../types/products';

export default {
    type: ProductType,
    args: {
        id: {
            name: "ID",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const deletedProduct = Product.findByIdAndRemove(params.id).exec();

        if (!deletedProduct) throw new Error("Error al borrar el producto");

        return deletedProduct;
    }
}