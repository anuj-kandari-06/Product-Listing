import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function Login() {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.trim();
        const password = formData.get("password");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a complete email address, e.g. name@gmail.com");
            emailRef.current?.focus();
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            window.dispatchEvent(new Event("auth-change"));
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            alert("Backend se connection nahi ho paa raha hai.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6 sm:py-10">
            <div className="w-full max-w-md rounded-xl border border-gray-200 p-5 sm:p-8 bg-white shadow-sm">
                <h1 className="text-center text-3xl font-bold text-blue-600">
                    ShopMart
                </h1>
                <h2 className="mt-3 text-center text-sm text-gray-500">
                    Welcome Back !
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Login to your ShopMart account
                </p>

                <form onSubmit={handleLogin} className="mt-6 sm:mt-8 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email or Mobile Number
                        </label>
                        <input ref={emailRef} type="text" name="email" placeholder="Enter email or mobile number" className="w-full min-w-0 rounded-lg border border-gray-300 outline-none px-3 sm:px-4 py-3 text-base focus:border-blue-500" required />
                    </div>

                    <div>
                        <div className="mb-1 flex items-center justify-between gap-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Link to="/forgot-password" className="text-xs sm:text-sm text-blue-600 hover:underline">
                                Forgot Password ?
                            </Link>
                        </div>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" className="w-full min-w-0 rounded-lg border border-gray-300 outline-none pl-3 sm:pl-4 pr-12 py-3 text-base focus:border-blue-500" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-blue-600" aria-label={showPassword ? "Hide password" : "Show password"}>
                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition">
                        LOGIN
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;