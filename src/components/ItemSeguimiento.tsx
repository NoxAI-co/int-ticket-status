interface ItemSeguimientoProps {
  fecha: number;
  descripcion: string;
  created?: boolean;
}

const ItemSeguimiento = ({
  fecha,
  descripcion,
  created = false,
  ...rest
}: ItemSeguimientoProps) => {
  return (
    <article
      className={`rounded-2xl p-4 mb-4 transition-colors hover:bg-stone-200 ${
        created ? "bg-tertiary" : "bg-stone-100 border border-gray-300"
      }`}
      {...rest}
    >
      <header className="text-md font-bold items-center flex">
        <span>
          {new Date(Number(fecha))
            .toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            .replace(".", ",")}
        </span>
        <span className="mx-2 font-normal text-xs">
          {new Date(Number(fecha)).toLocaleTimeString("es-ES", {
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </header>
      <p className="text-sm mt-2">{descripcion}</p>
    </article>
  );
};

export default ItemSeguimiento;
