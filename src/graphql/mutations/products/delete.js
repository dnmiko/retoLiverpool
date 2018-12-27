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
    //Recibe de parámetro el ID del producto que buscamos eliminar.
    args: {
        id: {
            name: "ID",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        //Utilizamos un método de mongoose para encontrar el producto por ID y eliminarlo.
        const deletedProduct = Product.findByIdAndRemove(params.id).exec();

        if (!deletedProduct) throw new Error("Error al borrar el producto");

        return deletedProduct;
    }
}