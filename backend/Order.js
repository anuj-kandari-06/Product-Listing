import mongoose, { mongo } from "mongoose";
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        items : [
            {
                productId :{
                    type:Number,
                    required:true,
                },
                title :{
                    type :String,
                    required:true,
                },
                price : {
                    type : Number,
                    required:true,
                },
                quantity : {
                    type :Number,
                    required : true,
                },
                thumbnail:String,
            },
        ],

        shippingAddress : {
            name: {type: String, required : true},
            mobile : {type: String, required : true },
            email : {type: String, required : true },
              address : {type: String, required : true },
                city : {type: String, required : true },
                  state : {type: String, required : true },
                    pincode : {type: String, required : true },
        },
        paymentMode : {
            type : String,
            enum:["cod", "online"],
            required: true,
        },
        totalAmount:{
            type: Number,
            required : true,
        },
        orderStatus:{
            type: String,
            default:"Placed"
        },
    },
    {timestamps:true}
);
const Order = mongoose.model("Order", orderSchema);

export default Order;