import { Toaster } from "react-hot-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout h-screen font-family-secondary">
      <main className="content">{children}</main>
      <Toaster />
    </div>
  );
}
