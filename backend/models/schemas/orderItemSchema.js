import mongoose from "mongoose";

const orderItemSchema = {
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    product: {type: mongoose.Types.ObjectId, required: true, ref: 'Product'}
}

export default orderItemSchema