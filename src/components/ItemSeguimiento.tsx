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
    <article className="w-full border border-neutral-700 rounded-sm" {...rest}>
      <header className={" py-1 px-2 text-md " + (created ? "bg-emerald-800" : "bg-neutral-700")}>
        {new Date(Number(fecha))
                .toLocaleDateString("es-ES", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
                .replace(".", ",")}
      </header>
      <p className="text-sm px-2">
        {descripcion}
      </p>
    </article>
  );
};

export default ItemSeguimiento;
