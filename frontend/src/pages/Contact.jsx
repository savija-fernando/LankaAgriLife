import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, User, MessageSquare } from "lucide-react";
import linkIcon from "../assets/link.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8070/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Thank you, ${formData.name}! Your message has been sent via WhatsApp.`);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Try again later.");
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-green-200 via-green-100 to-green-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 leading-tight drop-shadow-sm">
          Get in Touch
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
          We’d love to hear from you! Whether it’s a question, feedback, or
          just to say hello — drop us a message.
        </p>
      </section>

      {/* Contact Section */}
      <section className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Side: Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
              <img src={linkIcon} alt="Link" className="w-8 h-8" />
              Let’s Connect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Fill out the form and our team will get back to you as soon as
              possible. You can also reach us via email or social media.
            </p>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-green-600" />
                lankaagrilife@gmail.com
              </p>
              <p className="flex items-center gap-3 text-gray-700">
                <MessageSquare className="w-5 h-5 text-green-600" />
                +94 70 150 1303
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-green-100 flex flex-col gap-6"
            >
              {/* Name */}
              <label className="flex flex-col">
                <span className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-green-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                />
              </label>

              {/* Email */}
              <label className="flex flex-col">
                <span className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-green-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                />
              </label>

              {/* Message */}
              <label className="flex flex-col">
                <span className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                  className="border border-green-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition resize-none"
                ></textarea>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
