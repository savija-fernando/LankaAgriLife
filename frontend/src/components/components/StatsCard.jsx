function StatsCard({ title, value, color }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className={`p-4 rounded-lg shadow ${colors[color]}`}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-xl font-bold">${value.toLocaleString()}</p>
    </div>
  );
}

export default StatsCard;
