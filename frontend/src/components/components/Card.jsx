export default function Card({ title, value, sub }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 border">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-green-700">{value}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}
