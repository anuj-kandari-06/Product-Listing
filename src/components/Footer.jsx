function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-8 sm:mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-5 py-8 sm:py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            ShopMart
                        </h2>
                        <p className="text-sm leading-6 max-w-sm">
                            Discover quality products at great prices.
                            Shop your favourites in one place.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="hover:text-white transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/" className="hover:text-white transition-colors">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="/" className="hover:text-white transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Follow Us
                        </h3>
                        <div className="flex gap-5 text-2xl">
                            <a href="/" aria-label="Facebook" className="hover:text-white transition-colors">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="/" aria-label="Instagram" className="hover:text-white transition-colors">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="/" aria-label="Twitter" className="hover:text-white transition-colors">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-5 text-center text-xs sm:text-sm">
                    © {new Date().getFullYear()} ShopMart. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
export default Footer;
