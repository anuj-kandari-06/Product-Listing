import { useEffect } from "react";

function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2500);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className="pointer-events-none fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:top-5">
            <div className="flex items-center gap-3 rounded-md bg-[#292b40] px-4 py-3 text-white shadow-lg">
                <i className="fa-solid fa-circle-check shrink-0 text-green-400"></i>
                <p className="min-w-0 break-words text-sm font-semibold">
                    {message}
                </p>
            </div>
        </div>
    );
}
export default Toast;