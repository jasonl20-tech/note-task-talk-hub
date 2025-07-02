
import { FileText, ListTodo, MessageSquare, CheckCircle } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      name: "Notizen",
      value: "12",
      icon: FileText,
      color: "bg-blue-500",
      change: "+2 diese Woche",
    },
    {
      name: "Offene Tasks",
      value: "8",
      icon: ListTodo,
      color: "bg-yellow-500",
      change: "3 überfällig",
    },
    {
      name: "Forum Posts",
      value: "24",
      icon: MessageSquare,
      color: "bg-green-500",
      change: "+5 heute",
    },
    {
      name: "Erledigte Tasks",
      value: "15",
      icon: CheckCircle,
      color: "bg-purple-500",
      change: "+3 heute",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
