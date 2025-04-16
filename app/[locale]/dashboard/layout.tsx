import { AppSidebar } from "@/components/app-sidebar";
import Dashboardheader from "@/components/Headers/Dashboardheader";
import { SidebarProvider} from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Dashboardheader />
        {children}
      </main>
    </SidebarProvider>
  );
}
