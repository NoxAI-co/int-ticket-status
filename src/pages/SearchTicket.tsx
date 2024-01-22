import { IconSearch } from "@tabler/icons-react";
import Alert from "../components/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchTicket = () => {
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const consultarTicket = () => {
    const radicado = document.getElementById("id-radicado") as HTMLInputElement;
    if (!radicado.value) {
      setError("El radicado no puede estar vacio");
      return;
    }

    navigate(`/ticket/${radicado.value}`);
  };

  return (
    <>
      <span className="text-center font-semibold">
        Consulta el estado de tu soporte mediante esta herramienta
      </span>
      {error && <Alert message={error} />}
      <input
        className="flex w-full rounded-lg bg-gray-200 px-3 py-3 text-sm outline-none transition-colors hover:bg-gray-300 focus:bg-gray-300"
        placeholder="Numero de radicado"
        type="text"
        name="id-radicado"
        id="id-radicado"
      />
      <button
        onClick={consultarTicket}
        className="inline-flex text-[#16362b] font-semibold items-center w-full justify-center text-md gap-2 py-2 bg-gradient-linear rounded-lg border border-[#60c2a0] transition-colors duration-75 hover:opacity-80 appearance-none scale-100 transition-transform active:scale-[0.98]"
      >
        <IconSearch />
        Consultar
      </button>
    </>
  );
};

export default SearchTicket;
