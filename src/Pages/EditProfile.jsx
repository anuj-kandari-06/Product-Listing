import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        profileImage: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/profile", { credentials: "include" });
                const data = await response.json();

                if (response.status === 401) {
                    navigate("/login");
                    return;
                }
                if (!response.ok) {
                    setMessage(data.message || "Profile not loading");
                    return;
                }
                setFormData({
                    name: data.user.name || "",
                    email: data.user.email || "",
                    mobile: data.user.mobile || "",
                    address: data.user.address || "",
                    profileImage: data.user.profileImage || ""
                });
            } catch (error) {
                console.error("Profile fetch error:", error);
                setMessage("Connection failed by server");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/profile",
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setMessage(data.message || "Profile Not Updated");
                return;
            }
            setFormData({
                name: data.user.name || "",
                email: data.user.email || "",
                mobile: data.user.mobile || "",
                address: data.user.address || "",
                profileImage: data.user.profileImage || ""
            });
            setMessage("profile successfully update");
            window.dispatchEvent(new Event("auth-change"));
        } catch (error) {
            console.error("Profile update error:", error);
            setMessage("Connection failed by server");
        } finally {
            setSaving(false);
        }
    };
    if (loading) {
        return <p className="p-8 text-center">Loading profile....</p>;
    }
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className=" mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-md sm:p-8">
                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                    Edit Profile
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Update your Account Details.
                </p>
                {formData.profileImage && (
                    <div className="mb-6 flex justify-center">
                        <img src={formData.profileImage} alt=" Profile preview" className="h-24 w-24 rounedd-full border object-cover" onError={(event) => {
                            event.currentTarget.style.display = "none";
                        }} />
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Full Name
                        </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Mobile Number
                        </label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required maxLength={10} pattern="[6-9][0-9]{9}" title="Valid 10-digit mobile number" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email
                        </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Address
                        </label>
                        <textarea name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Enter your address" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Profile Image URL
                        </label>
                        <input type="url" name="profileImage" value={formData.profileImage} onChange={handleChange} placeholder="https://example.com/photo.jpg" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500" />
                    </div>
                    {message && (
                        <p className="text-sm text-pink-600" role="status">
                            {message}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-3">
                        <button type="submit" disabled={saving} className="rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white hover:bg-pink-600 disabled:opacity-60">
                            {saving ? "Saving...." : "Save Changes"}
                        </button>
                        <button type="button" onClick={() => navigate("/")} className=" rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditProfile;