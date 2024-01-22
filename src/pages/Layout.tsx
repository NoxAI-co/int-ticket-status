import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <h1 className="inline-flex gap-2 w-full items-center justify-center text-2xl font-bold tracking-wide">
          Ticket Status
        </h1>
      </header>
      <section className="max-w-7xl flex flex-col gap-8 bg-stone-100 p-8 rounded-lg">
        <span className="text-center">
          Consulta el estado de tu soporte mediante esta herramienta.
        </span>
        <Outlet />
      </section>
      <footer className="text-xs text-center">
        Una herramienta de gestoru software.
      </footer>
    </>
  );
};

export default Layout;
