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
    //Recibe de parámetro el ID y la información modificada del producto que buscamos modificar.
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
        //Utilizamos un método de mongoose para encontrar un producto por ID y actualizarlo.
        return Product.findByIdAndUpdate(params.id, {
            $set: { ...params.data
            }
        }).then((product) => {
            //Una vez que modificamos el producto, es necesario volver a buscarlo para regresar la información actualizada.
            return Product.findById(params.id).exec();
        }).catch((err) => {
            throw new Error("Error al actualizar el producto");
        })
    }
}