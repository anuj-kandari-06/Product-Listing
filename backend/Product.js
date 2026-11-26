import mongoose, { disconnect } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            required: true,
        },
        discountPercentage: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        thumbnail: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;