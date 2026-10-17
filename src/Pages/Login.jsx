import { useState } from "react";

function Login(){
    const [email, setEmail] = useState("");
    const[password,setPassword] =useState("");
    const[message,setMessage] =useState("");
    const [loading,setLoading] =useState(false);

    async function handleLogin(e) {
        e.prevemtDefault();
        setMessage("");
        setLoading("");

        try{
          const response =await fetch("http://localhost:5000/api/login",{
            method:"POST",
            credentials:"include",
            headers:{"Content-type":"application/json",

            },
            body:JSON.stringify({
                email,
                password,
            }),
        }
    );
    const data= await response.json();
    setMessage(data.message);
    // if(response.ok){
    //    localStorage.setItem("token",data.token);
    //    localStorage.setItem("user" , JSON.stringify(data.user)); 
    // }
} catch(error){
    setMessage("Not Connect By Server");
} finally{
    setLoading(false);
}
}
return(
    <div className="mx-auto mt-10 max-w-md rounded-xl broder border-gray-200 p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">
            Login
        </h1>
        <form onSubmit={handleLogin} className="spacey-y-4">
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border p-3"/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full rounded-lg border p-3"/>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-purple-600 p-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-60">
{loading ? "Loggin in...": "Login"}
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
export default Login;