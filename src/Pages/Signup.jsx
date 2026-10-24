import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const mobile = formData.get("mobile")?.toString().trim();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirmPassword")?.toString();

        if (password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Signup failed");
                return;
            }

            alert("Account created successfully !");
            navigate("/");
            window.dispatchEvent(new Event("auth-change"));
        } catch (error) {
            console.error("Signup error:", error);
            alert("Backend se connection nahi ho pa raha.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6 sm:py-10">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 sm:p-8 shadow-sm">
                <h1 className="text-center text-3xl font-bold text-blue-600">
                    ShopMart
                </h1>
                <h2 className="mt-3 text-center text-xl sm:text-2xl font-semibold text-gray-800">
                    Create Account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Sign up to get started with ShopMart
                </p>

                <form onSubmit={handleSignup} className="mt-6 sm:mt-8 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input type="text" name="name" placeholder="Enter your full name" className="w-full min-w-0 rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-base outline-none focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="w-full min-w-0 rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-base outline-none focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Mobile Number
                        </label>
                        <input type="tel" name="mobile" placeholder="Enter your mobile number" className="w-full min-w-0 rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-base outline-none focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" className="w-full min-w-0 rounded-lg border border-gray-300 outline-none pl-3 sm:pl-4 pr-12 py-3 text-base focus:border-blue-500" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-blue-600" aria-label={showPassword ? "Hide password" : "Show password"}>
                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password" className="w-full min-w-0 rounded-lg border border-gray-300 outline-none pl-3 sm:pl-4 pr-12 py-3 text-base focus:border-blue-500" required />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-blue-600" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>
                                <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition">
                        CREATE ACCOUNT
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Signup;