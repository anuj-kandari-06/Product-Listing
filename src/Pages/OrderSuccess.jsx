import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
    const location = useLocation();
    const order = location.state?.order;
    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Order details not found
                </h2>
                <Link to="/" className="mt-4 text-purple-600">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-md">
                <div className=" mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                    <i className="fa-solid fa-check"></i>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Order Placed Successfully !
                </h1>
                <p className="mt-3 text-gray-500">
                    Thank you for shopping with ShopMart.
                </p>
                <div className="mt-6 rounded-lg bg-gray-50 p-4 text-left">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-800 break-all">
                        {order._id}
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Total Amount
                    </p>
                    <p className="text-xl font-bold text-purple-600">
                        ${Number(order.totalAmount).toFixed(2)}
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Payment Method
                    </p>
                    <p className="font-medium uppercase text-gray-800">
                        {order.paymentMode}
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Order Status
                    </p>
                    <p className="font-medium text-green-600">
                        {order.orderStatus}
                    </p>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link to="/" className="flex-1 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700">
                        Continue Shopping
                    </Link>

                    <Link to="/my-orders" className="flex-1 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50">
                        My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default OrderSuccess;