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
    args: {
        id: {
            name: 'ID',
            type: GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const product = Product.findById(params.id).exec();
        return product;
    }
}

export default querySingleProduct;