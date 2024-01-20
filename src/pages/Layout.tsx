import { Outlet } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="inline-flex px-5 justify-beetwen items-center py-5 bg-neutral-800">
          <NavLink to="/" className="text-neutral-400">
            <HomeIcon className="h-7" />
          </NavLink>
          <h1 className="inline-flex gap-2 w-full items-center justify-center text-2xl font-bold tracking-wide">
            Ticket Status
          </h1>
        
      </header>
      <main className=" bg-neutral-800 mx-2 rounded-md px-6 py-4 flex flex-col gap-4">
      <span className="text-neutral-400 text-center">
          Consulta el estado de tu soporte mediante esta herramienta.
        </span>
        <Outlet />
      </main>
      <footer className="text-xs px-4 text-neutral-400">
        Una herramienta de gestoru software.
      </footer>
    </>
  );
};

export default Layout;
