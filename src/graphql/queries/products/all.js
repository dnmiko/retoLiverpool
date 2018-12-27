import {
    GraphQLList
} from 'graphql';
import Product from '../../../models/products';
import {
    ProductType
} from '../../types/products';

const queryAllProducts = {

    type: new GraphQLList(ProductType),
    resolve() {
        const products = Product.find().exec();
        if (!products) throw new Error("Error al traer de la bd");
        return products;
    }
}

export default queryAllProducts;