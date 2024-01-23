import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <>
      <img
        src="/images/asset-2.png"
        alt="Triangulo"
        className="absolute top-[21%] md:left-[33%] left-4 w-[26px]"
      />
      <img
        src="/images/asset-1.png"
        alt="Mancha"
        className="absolute bottom-0 md:bottom-20 right-0 md:left-36 w-[100px] md:w-[140px] blur-md"
      />
      <img
        src="/images/asset-2.png"
        alt="Triangulo"
        className="absolute top-20 right-40 z-[-1]"
      />
      <Toaster closeButton={true} richColors visibleToasts={2} />
      <img
        src="/images/gestoru-logo.webp"
        alt="Logo"
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
