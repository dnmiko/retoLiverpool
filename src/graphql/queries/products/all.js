import {
    GraphQLList
} from 'graphql';
import Product from '../../../models/products';
import {
    ProductType
} from '../../types/products';

const queryAllProducts = {
    //Recibimos una lista de GraphQL como respuesta.
    type: new GraphQLList(ProductType),
    resolve() {
        //Utilizamos un método de mongoose para encontrar todos los productos.
        const products = Product.find().exec();
        if (!products) throw new Error("Error al traer los productos de la base de datos");
        return products;
    }
}

export default queryAllProducts;