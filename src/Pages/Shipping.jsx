import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function Shipping() {
    const [paymentMode, setPaymentMode] = useState("cod");
 const navigate = useNavigate();
 const{cartItems, clearCart} = useCart();
 const [placingOrder, setPlacingOrder]= useState(false);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState("");
    
    useEffect(()=>{
        const checkUser = async () =>{
            try{
                const response = await fetch("http://localhost:5000/api/me", {
                    credentials:"include",
                });
                if(response.status === 401){
                    navigate("/login", {
                        state :{from : "/shipping"},
                        replace:true,
                    });
                    return;
                }
                if(!response.ok){
                    throw new Error ("Unable to fetch user details");
                }
                const data = await response.json();
                setUser(data.user);
            }catch(error){
                console.error("Shipping user check failed:", error);
                setError("Unable to load your details. Please try again.");
            }finally{
                setLoading(false);
            }
        };
        checkUser();
    }, [navigate]);

    const handlePlaceOrder = async (e)=>{
        e.preventDefault();
        if(placingOrder) return;
        setPlacingOrder(true);
        const formData = new FormData(e.currentTarget);
        const shippingAddress ={
            name : formData.get("name"),
             mobile : formData.get("mobile"),
              email : formData.get("email"),
               address : formData.get("address"),
                city : formData.get("city"),
                 state : formData.get("state"),
                  pincode : formData.get("pincode"),
        };
        const items = cartItems.map((item)=>({
            productId:item.id,
            title:item.title,
            price:Number(item.price),
            quantity:Number(item.quantity),
            thumbnail : item.thumbnail,
        }));
        try{
            const response = await fetch("http://localhost:5000/api/orders",{
            method : "POST",
   headers:{
    "Content-Type":"application/json",
   },
   credentials : "include",
   body:JSON.stringify({
    items,shippingAddress, paymentMode,
   }),
            });
            const data = await response.json();
            if(!response.ok) {
                alert(data.message || "Order failed");
                return;
            }
            clearCart();
            navigate("/order-success", {
                state :{order:data.order},
            });
        } catch (error){
            console.error("Order error:", error);
            alert("Something went wrong.PLeae try again.");
        }finally{
            setPlacingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-3xl font-bold text-[#aa3bff]">
                 <Link to="/"> ShopMart </Link>
                </h1>
                <h2 className="mb-6 text-2xl font-semibold">
                    Shipping Details
                </h2>

                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-5 rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
                        <div>
                            <label className="mb-2 block">Full Name</label>
                             <input type="name" name="name" defaultValue={user?.name || ""} placeholder="Enter your Full Name" required className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#aa3bff]"/>
                        </div>
                        <div>
                            <label className="mb-2 block">Mobile Number</label>
                            <input type="mobile" name="mobile" defaultValue={user?.mobile || ""} placeholder="Enter your mobile number" required className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#aa3bff]"/>
                        </div>
                        <div>
                            <label className="mb-2 block">Email Address</label>
                             <input type="email" name="email" defaultValue={user?.email || ""} placeholder="Enter your email" required className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#aa3bff]"/>
                        </div>
                        <div>
                            <label className="mb-2 block">Full Address</label>
                            <textarea name="address" placeholder="House number, street, area" rows="3" required className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#aa3bff]" />
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block">City</label>
                                <input type="text" name="city" placeholder="Enter your city name" required className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#aa3bff]" />
                            </div>
                            <div>
                                <label className="mb-2 block">State</label>
                                <input type="text" name="state" placeholder="Enter your state name" required className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#aa3bff]"/>
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block">PIN Code</label>
                            <input type="text" name="pincode" placeholder="6-digit PIN code" pattern="[0-9]{6}" required className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#aa3bff]"/>
                        </div>
                    </div>
                    <div className="h-fit rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-lg font-bold">
                            Payment Method
                        </h2>
                        <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-lg  border border-gray-200 p-4">
                            <input type="radio" name="paymentMode" value="cod" checked={paymentMode === "cod"} onChange={(e)=> setPaymentMode(e.target.value)}  className="mt-3"/>
                            <span>
                                <span className="block font-medium">
                                    Cash on Delivery
                                </span>
                                <span className="text-sm text-gray-500">
                                    Pay when your order arrives
                                </span>
                            </span>
                        </label>
                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4">
                            <input type="radio" name="paymentMode" value="online" checked={paymentMode === "online"} onChange={(e)=> setPaymentMode(e.target.value)} className="mt-3"/>
                            <span>
                                <span className="block font-medium">
                                    Online Payment
                                </span>
                                <span className="text-sm text-gray-500">
                                    UPI, card or net banking
                                </span>
                            </span>
                        </label>
                        <button type="submit" disabled={placingOrder} className="mt-6 w-full rounded-lg bg-[#aa3bff] px-4 py-3 font-semibold text-white hover:opacity-90">
                            {placingOrder ? "Placing Order...": "PLACE ORDER"}
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-500">
                            Secure shopping with ShopMart
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Shipping;