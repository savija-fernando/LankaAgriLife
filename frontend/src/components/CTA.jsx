import React from "react";

const CTA = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-100 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-green-700">
        Ready to Get Started?
      </h2>
      <p className="mt-3 text-gray-700 max-w-xl mx-auto text-base sm:text-lg">
        Join thousands of farmers and agricultural businesses already growing with us.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
          Start Free Trial
        </button>
        <button className="px-6 py-3 bg-white text-green-700 border border-green-600 rounded-lg font-medium hover:bg-gray-100 transition">
          Schedule Demo
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        No credit card required • 14-day free trial • Cancel anytime
      </p>
    </section>
  );
};

export default CTA;
