export default function AboutPage() {
  return (
    <div className="w-full bg-linear-to-b from-black via-gray-900 to-black text-white">

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/90" />
        
        <div className="relative z-10 px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeIn">
            About <span className="text-accent">I-Computers</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 animate-slideUp">
            Your trusted partner in modern computing solutions
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Who We Are
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              <span className="text-accent font-semibold">
                I-Computers
              </span>{" "}
              is a modern computer shop dedicated to delivering high-performance
              desktops, laptops, and components tailored for gamers, developers,
              creators, and businesses.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We focus on quality hardware, expert advice, and reliable support —
              helping our customers upgrade with confidence.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Quality Products", value: "100%" },
              { label: "Customer Focused", value: "Always" },
              { label: "Modern Hardware", value: "Latest" },
              { label: "Trusted Support", value: "24/7" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/60 backdrop-blur rounded-xl p-6 text-center hover:scale-105 transition"
              >
                <h3 className="text-2xl font-bold text-accent">
                  {item.value}
                </h3>
                <p className="text-gray-300 mt-2">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-16 bg-gray-900/70 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-gray-800/60 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-3 text-accent">
              Our Mission
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To empower individuals and businesses with reliable, powerful,
              and future-ready computing solutions.
            </p>
          </div>

          <div className="bg-gray-800/60 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-3 text-accent">
              Our Vision
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To become a trusted technology partner known for quality,
              innovation, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-accent">Us</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Expert Guidance",
            "Top-Tier Components",
            "Custom Builds",
            "Reliable After-Sales Support",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/60 rounded-xl p-6 text-center hover:translate-y-[-5px] transition"
            >
              <p className="font-semibold text-lg">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-linear-to-r from-accent to-blue-700 text-black text-center px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Build Your Next Machine With Us
        </h2>
        <p className="text-lg mb-8">
          Let us help you choose the perfect setup.
        </p>
        <a
          href="/products"
          className="inline-block px-10 py-4 bg-black text-white rounded-xl font-semibold hover:scale-105 transition"
        >
          Explore Products
        </a>
      </section>
    </div>
  );
}
