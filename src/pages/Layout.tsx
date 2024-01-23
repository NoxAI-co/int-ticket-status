import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <>
    <Toaster closeButton={true} richColors visibleToasts={2} />
      <img
        src="/images/gestoru-logo.webp"
        alt="Ticket Status"
        className="w-16 rounded-[20px] mx-auto"
      />
      <header>
        <h1 className="inline-flex gap-2 w-full items-center justify-center text-2xl font-bold tracking-wide my-4">
          Ticket Status
        </h1>
      </header>
      <section className="max-w-screen-md w-screen md:w-[768px] flex flex-col gap-8 bg-white p-8 rounded-3xl section__container">
        <Outlet />
      </section>
      <footer className="text-xs text-center pt-12">
        Una herramienta de Gestoru Software.
      </footer>
    </>
  );
};

export default Layout;
