import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';
import Product from '../../../models/products';
import {
    ProductType
} from '../../types/products';

const querySingleProduct = {
    type: ProductType,
    //Recibe de parámetro un ID de producto para buscarlo.
    args: {
        id: {
            name: 'ID',
            type: GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        //Utilizamos un método de mongoose para buscar un producto por ID.
        const product = Product.findById(params.id).exec();
        return product;
    }
}

export default querySingleProduct;