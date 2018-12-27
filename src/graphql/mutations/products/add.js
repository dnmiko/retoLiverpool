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
    //Recibe de parámetro un producto con la estructura que definimos en los tipos de graphql.
    args: {
        data: {
            type: new GraphQLNonNull(ProductInputType)
        }
    },
    resolve(root, params) {
        //Creamos un nuevo producto con la información que recibimos del request.
        const product = new Product(params.data);
        //Guardamos el producto en la base de datos.
        const newProduct = product.save();

        if (!newProduct) throw new Error("Error al agregar nuevo producto");
        //Regresa el mismo objeto que se envía de parámetro, pero con el _id que le corresponde.
        return newProduct;
    }
}