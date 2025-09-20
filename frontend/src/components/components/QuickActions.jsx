import { PlusCircle, Recycle, Edit, Package, DollarSign } from "lucide-react";

const actions = [
  { name: "Add New Crop", icon: <PlusCircle size={16} /> },
  { name: "Start Compost Batch", icon: <Recycle size={16} /> },
  { name: "Record Livestock Data", icon: <Edit size={16} /> },
  { name: "Update Inventory", icon: <Package size={16} /> },
  { name: "Add Revenue Entry", icon: <DollarSign size={16} /> },
];

export default function QuickActions() {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <ul className="space-y-2">
        {actions.map((action) => (
          <li
            key={action.name}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 cursor-pointer"
          >
            {action.icon}
            <span>{action.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
