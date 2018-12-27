import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "description": {
        type: String,
        required: false
    },
    "price": {
        type: Number,
        default: 0
    },
    "image_url": {
        type: String,
        required: true
    }
}, {
    collection: "Products",
    timestamps: true
});

export default mongoose.model("Products", ProductSchema);