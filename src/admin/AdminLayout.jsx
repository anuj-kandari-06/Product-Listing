import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
    const menuItems = [
        { name: "Dashboard", path: "/admin" },
        { name: "Products", path: "/admin/products" },
        { name: "Orders", path: "/admin/orders" },
        { name: "Customers", path: "/admin/customers" },
        { name: "Categories", path: "/admin/categories" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
                <h1 className="text-2xl font-bold mb-10">ShopMart Admin</h1>
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === "/admin"}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-md transition ${
                                    isActive
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-8 min-w-0">
                <Outlet />
            </main>
        </div>
    );
}
export default AdminLayout;
