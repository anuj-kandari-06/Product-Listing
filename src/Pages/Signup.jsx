import { Link, useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        // console.log("Signup form submitted");
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <h1 className="text-center text-3xl font-bold text-blue-600">
                    ShopMart
                </h1>
                <h2 className="mt-3 text-center text-2xl font-semibold text-gray-800">
                    Create Account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Sign up to get started with ShopMart
                </p>

                <form onSubmit={handleSignup} className="mt-8 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input type="text" name="name" placeholder="Enter your full name" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Mobile Number
                        </label>
                        <input type="tel" name="mobile" placeholder="Enter your mobile number" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="mb-1 block tet-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input type="password" name="password" placeholder="Create your Password" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="mb-1 text-gray-700 text-sm font-medium">
                            Confirm Password
                        </label>
                        <input type="password" name="confirmPassword" placeholder="Confirm your password" className="w-full rounded-lg border border-gray-300 outline-none px-4 py-3 focus:border-blue-500" required />
                    </div>

                    <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
                        CREATE ACCOUNT
                    </button>
                </form>


                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account ? {" "}
                    <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Signup;