import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-14">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-3">
            I<span className="text-accent">-</span>Computers
          </h2>
          <p className="text-sm leading-relaxed">
            Premium computers, components, and custom builds designed
            for gamers, creators, and professionals.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-accent transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-accent transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-accent transition cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-accent transition cursor-pointer">
              Warranty
            </li>
            <li className="hover:text-accent transition cursor-pointer">
              Returns
            </li>
            <li className="hover:text-accent transition cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@icomputers.lk</li>
            <li>Phone: +94 77 123 4567</li>
            <li>Location: Sri Lanka</li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-800 mt-12"></div>

      {/* BOTTOM BAR */}
      <div className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} I-Computers. All rights reserved.
      </div>
    </footer>
  );
}
