function Header() {
  return (
    <header className="relative bg-gradient-to-r from-green-700 to-green-500 text-white p-6 rounded-2xl shadow-lg overflow-hidden text-center max-w-3xl mx-auto mt-6">
      {/* Decorative leaf icons */}
      <div className="absolute top-0 left-0 opacity-20">
        <span className="text-4xl">🍃</span>
      </div>
      <div className="absolute bottom-0 right-0 opacity-20">
        <span className="text-5xl">🌿</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-1">
        🌾 Revenue Manager
      </h1>

      {/* Subtitle */}
      <p className="text-sm opacity-90">
        Track your revenue, income, and expenses with a fresh agricultural approach
      </p>

      {/* Decorative underline */}
      <div className="w-16 h-1 mx-auto bg-yellow-300 rounded-full mt-2"></div>
    </header>
  );
}

export default Header;
