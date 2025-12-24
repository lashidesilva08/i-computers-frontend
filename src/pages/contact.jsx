import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // integrate backend / email service later
    console.log(form);
  };

  return (
    <div className="w-full bg-linear-to-b from-black via-gray-900 to-black text-white">

      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/90" />

        <div className="relative z-10 px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeIn">
            Contact <span className="text-accent">I-Computers</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 animate-slideUp">
            We’re here to help you build, upgrade, and succeed
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-300">
              Have a question about products, custom builds, or support?
              Reach out to us — our team is ready to help.
            </p>

            <div className="grid gap-6">
              {[
                { label: "Email", value: "support@icomputers.lk" },
                { label: "Phone", value: "+94 77 123 4567" },
                { label: "Location", value: "Sri Lanka" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/60 backdrop-blur rounded-xl p-5 hover:scale-105 transition"
                >
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="font-semibold text-lg">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-gray-800/60 backdrop-blur rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent text-white rounded-lg font-semibold transition hover:opacity-90 hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-900/80 text-center px-6">
        <p className="text-gray-300">
          Prefer visiting us in person? Drop by our store anytime.
        </p>
      </section>
    </div>
  );
}
