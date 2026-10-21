import { Link, useNavigate} from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.trim();
        const password =formData.get("password");
        try{
            const response = await fetch("http://localhost:5000/api/login",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                credentials: "include",
                body:JSON.stringify({email,password}),
            });
            const data = await response.json();
            if(!response.ok){
                alert(data.message || "Login failed");
                return;
            }
            window.dispatchEvent(new Event("auth-change"));
            navigate("/");
        }catch (error){
            console.error("Login error:", error);
            alert("Backend se connection nahi ho paa raha hai.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-xl border border-gray-200 p-8 bg-white shadow-sm">
                <h1 className="text-center text-3xl font-bold text-blue-600">
                    ShopMart
                </h1>
                <h2 className="mt-3 text-center text-sm text-gray-500">
                    Welcome Back !
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Login to your ShopMart account
                </p>

                <form onSubmit={handleLogin} className="mt-8 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email or Mobile Number
                        </label>
                        <input type="text" name="email" placeholder="Enter email or mobile number" className="w-full rounded-lg border border-gray-300 outline-none px-4 py-3 focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input type="password" name="password" placeholder="Enter your password" className="w-full rounded-lg border border-gray-300 outline-none px-4 py-3 focus:border-blue-500" required />
                    </div>

                    <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
                        LOGIN
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account ? {" "}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;