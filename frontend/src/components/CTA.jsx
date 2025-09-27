import React from "react";

const CTA = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-100 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-green-700">
        Looking to Work With Us?
      </h2>
      <p className="mt-3 text-gray-700 max-w-xl mx-auto text-base sm:text-lg">
        Join our community of farmers and start growing together. Fill out a quick form to apply as a farmer.
      </p>

      <div className="mt-6 flex justify-center">
        <a
          href="https://forms.gle/mRTVNNsFcSJhvZHH8" // replace with your Google Form or signup route
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
        >
          Recruit Me as a Farmer
        </a>
      </div>
    </section>
  );
};

export default CTA;
