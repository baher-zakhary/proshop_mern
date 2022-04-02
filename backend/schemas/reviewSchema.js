import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true}
}, {
    timestamp: true
})

export default reviewSchema