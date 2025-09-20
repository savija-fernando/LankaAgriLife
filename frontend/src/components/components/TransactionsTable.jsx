import { Pencil, Trash2 } from "lucide-react";

function TransactionsTable({ transactions }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">📑 Recent Transactions</h2>
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left">
            <th className="p-2">Type</th>
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    t.type === "revenue"
                      ? "bg-green-100 text-green-700"
                      : t.type === "income"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {t.type}
                </span>
              </td>
              <td className="p-2">{t.title}</td>
              <td className="p-2">{t.category}</td>
              <td
                className={`p-2 font-semibold ${
                  t.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.amount > 0
                  ? `+$${t.amount.toLocaleString()}`
                  : `-$${Math.abs(t.amount).toLocaleString()}`}
              </td>
              <td className="p-2">
                {new Date(t.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="p-2 flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Pencil size={16} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
