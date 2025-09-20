export default function RecentActivities() {
  const activities = [
    { text: "Corn harvest completed - Field A", time: "2 hours ago", tag: "harvest" },
    { text: "Compost batch #CB-2024-05 ready", time: "4 hours ago", tag: "compost" },
    { text: "Milk production recorded - 150L", time: "6 hours ago", tag: "livestock" },
    { text: "Payment received - $2,500", time: "1 day ago", tag: "revenue" },
    { text: "Low stock alert - Organic fertilizer", time: "2 days ago", tag: "inventory" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <ul className="space-y-3">
        {activities.map((a, i) => (
          <li key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <div>
              <p className="text-sm">{a.text}</p>
              <span className="text-xs text-gray-400">{a.time}</span>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              {a.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
