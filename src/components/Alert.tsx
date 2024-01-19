interface AlertProps {
  message: string;
}

const Alert = ({ message }: AlertProps) => {
  return (
    <div className="border-t-4 inline-flex gap-2 items-center text-red-400 font-normal tracking-wide text-md bg-red-900/5 border-red-700 px-2 py-4" role="alert">
      {message}
    </div>
  );
}

export default Alert;