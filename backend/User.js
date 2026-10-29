import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: "",
        },
        profileImage: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            required: true,
        },
        cartItems: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        wishlistItems: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;