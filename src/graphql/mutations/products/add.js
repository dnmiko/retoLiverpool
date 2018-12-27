import {
    GraphQLNonNull
} from 'graphql';
import Product from '../../../models/products';
import {
    ProductInputType,
    ProductType
} from '../../types/products';

export default {
    type: ProductType,
    args: {
        data: {
            type: new GraphQLNonNull(ProductInputType)
        }
    },
    resolve(root, params) {
        const product = new Product(params.data);
        const newProduct = product.save();

        if (!newProduct) throw new Error("Error al agregar nuevo producto");
        //Me regresa el mismo objeto que le mandé de parámetro, pero con el _id que le corresponde.
        return newProduct;
    }
}