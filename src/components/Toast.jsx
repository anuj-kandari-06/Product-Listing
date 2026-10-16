import { useEffect } from "react";
function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2500);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className="fixed left-1/2 top-5 z-[100] -translate-x-1/2">
            <div className="flex items-center gap-3 rounded-md bg-[#292b40] px-3 py-2 text-white shadow-lg">
                <i className="fa-solid fa-circle-check text-green-400"></i>
                <p className="whitespace-nowrap text-sm font-semibold">
                    {message}
                </p>
            </div>
        </div>
    );
}
export default Toast;
