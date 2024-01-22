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
      <header className="text-md grid">
        <span className="text-md capitalize">
          {new Date(Number(fecha)).toLocaleDateString("es-ES", {
            weekday: "long",
          })}
        </span>
        <span className="text-xl font-bold">
          {new Date(Number(fecha))
            .toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            .replace(".", ",")}
        </span>
      </header>
      <span className="mt-12">
        {new Date(Number(fecha)).toLocaleTimeString("es-ES", {
          hour: "numeric",
          minute: "numeric",
        })}
      </span>
      <p className="text-md mt-2">{descripcion}</p>
    </article>
  );
};

export default ItemSeguimiento;
