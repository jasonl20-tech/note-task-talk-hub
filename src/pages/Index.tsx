
import { Layout } from "@/components/Layout";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentActivity } from "@/components/RecentActivity";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Willkommen in deiner persönlichen Produktivitätszentrale</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivity />
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Schnellzugriff</h2>
          <div className="space-y-3">
            <Link
              to="/notes"
              className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">Neue Notiz erstellen</h3>
              <p className="text-sm text-gray-600">Schnell eine neue Notiz hinzufügen</p>
            </Link>
            <Link
              to="/tasks"
              className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">Task hinzufügen</h3>
              <p className="text-sm text-gray-600">Neue Aufgabe zur Liste hinzufügen</p>
            </Link>
            <Link
              to="/forum"
              className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">Diskussion starten</h3>
              <p className="text-sm text-gray-600">Neuen Forum-Post erstellen</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
