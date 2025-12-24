import { Link } from "react-router-dom";

export default function Home() {
return (
<div className="w-full bg-linear-to-b from-black via-gray-900 to-black text-white">

    {/* HERO SECTION */}
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{
      backgroundImage: "url('/login-bg.jpg')",
    }} />

        {/* Gradient Overlay (tuned for this image) */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/65 to-black/80" />

        {/* Content */}
        <div className="relative z-10 px-4 max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fadeIn">
                Welcome to{" "}
                <span className="text-accent">I-Computers</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 animate-slideUp">
                Premium computers, components, and performance solutions
            </p>

            {/* Animated slogans */}
            <div className="relative h-10 overflow-hidden mb-8">
                <div className="absolute w-full animate-textRotate text-primary text-xl font-semibold">
                    Upgrade Your World 🚀
                </div>
                <div
                    className="absolute w-full animate-textRotate delay-2000 text-primary text-xl font-semibold">
                    Built for Developers, Gamers & Creators 💻
                </div>
                <div
                    className="absolute w-full animate-textRotate delay-4000 text-primary text-xl font-semibold">
                    Performance You Can Trust ⚡
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/products"
                    className="px-8 py-3 bg-accent text-white rounded-lg font-semibold transition transform hover:scale-105 hover:shadow-xl">
                    Shop Now
                </a>

                <a href="/contact"
                    className="px-8 py-3 border border-white text-white rounded-lg font-semibold transition hover:bg-white hover:text-black">
                    Contact Us
                </a>
            </div>
        </div>
    </section>
    

    {/* FEATURES SECTION */}
    <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-cyan-400">I-Computers</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
            {
            title: "High-Performance PCs",
            desc: "Custom-built systems optimized for speed, gaming, and productivity."
            },
            {
            title: "Latest Components",
            desc: "Top brands, latest GPUs, CPUs, and accessories."
            },
            {
            title: "Trusted Support",
            desc: "Expert advice and reliable after-sales service."
            }
            ].map((item, index) => (
            <div key={index}
                className="bg-gray-800/60 backdrop-blur rounded-xl p-6 hover:scale-105 transition shadow-lg">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                    {item.title}
                </h3>
                <p className="text-gray-300">
                    {item.desc}
                </p>
            </div>
            ))}
        </div>
    </section>

    {/* CALL TO ACTION */}
    <section className="py-16 bg-linear-to-r from-cyan-500 to-blue-600 text-black text-center px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Upgrade?
        </h2>
        <p className="text-lg mb-8">
            Discover powerful machines designed for your needs.
        </p>
        <Link to="/products"
            className="inline-block px-10 py-4 bg-black text-white rounded-xl font-semibold hover:scale-105 transition">
        Browse Products
        </Link>
    </section>
</div>
);
}