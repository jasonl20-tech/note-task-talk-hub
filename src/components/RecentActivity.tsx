
import { Clock, FileText, ListTodo, MessageSquare } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "note",
      action: "Neue Notiz erstellt",
      title: "Meeting-Protokoll Q4",
      time: "vor 2 Stunden",
      icon: FileText,
    },
    {
      id: 2,
      type: "task",
      action: "Task abgeschlossen",
      title: "Website-Design überarbeiten",
      time: "vor 4 Stunden",
      icon: ListTodo,
    },
    {
      id: 3,
      type: "forum",
      action: "Neuer Forum-Post",
      title: "Diskussion über React Hooks",
      time: "vor 1 Tag",
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "task",
      action: "Neue Task erstellt",
      title: "Bug-Fixes implementieren",
      time: "vor 1 Tag",
      icon: ListTodo,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Letzte Aktivitäten</h2>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <activity.icon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-600 truncate">{activity.title}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
