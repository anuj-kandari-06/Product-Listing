
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Send OTP
    const handleContinue = async (e) => {
        e.preventDefault();

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/send-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ mobile }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "OTP send nahi ho paya.");
                return;
            }

            setOtpSent(true);
            alert("OTP bhej diya gaya hai.");
        } catch (error) {
            console.error("Send OTP error:", error);
            alert("Backend se connection nahi ho paa raha hai.");
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(otp)) {
            alert("Please enter the 6-digit OTP.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ mobile, otp }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "OTP verification failed.");
                return;
            }

            window.dispatchEvent(new Event("auth-change"));
            navigate("/");
        } catch (error) {
            console.error("Verify OTP error:", error);
            alert("Backend se connection nahi ho paa raha hai.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fdeeef] flex items-center justify-center px-4 py-8">

            {/* Main Login Card */}
            <div className="w-full max-w-[420px] overflow-hidden rounded-sm bg-white shadow-xl">

                {/* Promo Banner */}
                <div className="flex items-center justify-between gap-4 bg-[#fff0e5] px-6 py-6 sm:px-8">

                    <div>
                        <p className="text-xs font-semibold tracking-widest text-gray-500">
                            FLAT
                        </p>

                        <h2 className="mt-1 text-3xl font-extrabold leading-tight text-[#282c3f] sm:text-4xl">
                            ₹300 OFF
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            On your first order
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-[#282c3f]">
                        <i className="fa-solid fa-bag-shopping text-5xl"></i>
                        {/* <i className="fa-solid fa-lock text-2xl"></i> */}
                    </div>

                </div>

                {/* Login / OTP Section */}
                <div className="px-6 py-8 sm:px-8 sm:py-10">

                    <h1 className="text-xl font-bold text-[#282c3f]">
                        {otpSent ? (
                            "Verify with OTP"
                        ) : (
                            <>
                                Login <span className="font-normal">or Signup</span>
                            </>
                        )}
                    </h1>

                    {otpSent && (
                        <p className="mt-3 text-sm text-gray-600">
                            Enter the OTP sent to +91 {mobile}
                        </p>
                    )}

                    {/* Mobile Number Form */}
                    {!otpSent ? (
                        <form
                            onSubmit={handleContinue}
                            className="mt-7 space-y-5"
                        >
                            <div className="flex w-full items-center border border-gray-300 focus-within:border-[#ff3f6c]">

                                <span className="border-r border-gray-300 px-4 py-3.5 text-sm text-[#282c3f]">
                                    +91
                                </span>

                                <input
                                    type="tel"
                                    name="mobile"
                                    value={mobile}
                                    onChange={(e) =>
                                        setMobile(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 10)
                                        )
                                    }
                                    placeholder="Mobile Number"
                                    maxLength={10}
                                    inputMode="numeric"
                                    autoComplete="tel-national"
                                    className="min-w-0 flex-1 px-3 py-3.5 text-sm text-[#282c3f] outline-none"
                                    required
                                />

                            </div>

                            <p className="text-xs leading-5 text-gray-500">
                                By continuing, I agree to the{" "}
                                <span className="font-semibold text-[#ff3f6c]">
                                    Terms of Use
                                </span>{" "}
                                &amp;{" "}
                                <span className="font-semibold text-[#ff3f6c]">
                                    Privacy Policy
                                </span>
                            </p>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#ff3f6c] py-3.5 text-sm font-bold tracking-wide text-white transition hover:bg-[#e93660] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "PLEASE WAIT..." : "CONTINUE"}
                            </button>

                        </form>
                    ) : (

                        /* OTP Verification Form */
                        <form
                            onSubmit={handleVerifyOtp}
                            className="mt-7 space-y-5"
                        >
                            <input
                                type="text"
                                name="otp"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 6)
                                    )
                                }
                                placeholder="Enter 6-digit OTP"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                className="w-full border border-gray-300 px-4 py-3.5 text-sm outline-none focus:border-[#ff3f6c]"
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#ff3f6c] py-3.5 text-sm font-bold tracking-wide text-white transition hover:bg-[#e93660] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "VERIFYING..." : "VERIFY OTP"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setOtpSent(false);
                                    setOtp("");
                                }}
                                className="w-full text-sm font-semibold text-[#ff3f6c] hover:underline"
                            >
                                Change mobile number
                            </button>

                        </form>
                    )}

                    {/* Help Text */}
                    <p className="mt-7 text-sm leading-6 text-gray-600">
                        Having trouble logging in?{" "}
                        <span className="font-semibold text-[#ff3f6c]">
                            Get help
                        </span>
                    </p>

                    <p className="mt-7 border-t border-gray-100 pt-5 text-xs leading-5 text-gray-500">
                        Your mobile number will be used to securely verify your account.
                    </p>

                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-5 text-center text-xs tracking-wide text-gray-400">
                    SHOPMART — HAPPY SHOPPING
                </div>

            </div>
        </div>
    );
}

export default Login;
