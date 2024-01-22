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
      {error && <Alert message={error} />}
      <label>
        Radicado
        <input
          className=" bg-stone-200 px-4 w-full py-2 rounded-md placeholder:text-neutral-600 focus:outline-none"
          placeholder="Numero de radicado"
          type="text"
          name="id-radicado"
          id="id-radicado"
        />
      </label>
      <button
        onClick={consultarTicket}
        className="inline-flex text-blue-100 items-center w-full justify-center text-md gap-2 py-2 bg-emerald-600 rounded-md 
      hover:bg-emerald-700 transition-colors duration-75"
      >
        <IconSearch />
        Consultar
      </button>
    </>
  );
};

export default SearchTicket;
