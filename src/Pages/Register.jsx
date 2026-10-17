import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            },
            );
            const data = await response.JSON();
            setMessage(data.message);
            if (response.ok) {
                setName("");
                setEmail("");
                setPassword("");
            }
        
    } catch (error) {
        setMessage("Not Connect By server.");
    } finally {
        setLoading(false);
    }

    return (
        <div className="mx-auto mt-10 max-w-md rounded-xl border border-gray-200 p-6 shadow-sm">
            <h1 className="mb-6 text-center text-2xl font-bold">
                Create Account
            </h1>
            <form onSubmit={handleRegister} className="space-y-4">
                <input type=" text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg border p-3" />
                <imput type="text" placeholder="Email address" value={email} onChange={(e) => SetEmail(e.target.value)} required classNamew-full rounded-lg border p-3 />
                <input type="password" placeholder="Password(minimum 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required className="w-full rounded-lg border p-3" />
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-purple-600 p-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-60">
                    {loading ? "Creating account..." : "Register"}
                </button>
                {message && (
                    <p role="status" className="text-center text-sm">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
}
export default Register;