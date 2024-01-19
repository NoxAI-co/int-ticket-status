import { Outlet } from "react-router-dom";
import { TicketIcon } from "@heroicons/react/24/solid";

const Layout = () => {
  return (
    <>
      <header className="flex mx-2 flex-col justify-center items-center">
        <h1 className="inline-flex gap-2 w-full items-center justify-center text-3xl font-bold tracking-wide">
          <TicketIcon className="h-10 text-emerald-500" />
          Ticket Status
        </h1>
        <span className="text-neutral-400 text-center">
          Consulta el estado de tu soporte mediante esta herramienta.
        </span>
      </header>
      <main className=" bg-neutral-800 mx-2 rounded-md px-6 py-4 flex flex-col gap-4">
        <Outlet />
      </main>
      <footer className="text-xs px-4 text-neutral-400">
        Una herramienta de gestoru software.
      </footer>
    </>
  );
};

export default Layout;
