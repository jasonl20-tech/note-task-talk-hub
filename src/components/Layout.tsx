
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Angemeldet als: {user?.email}
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
