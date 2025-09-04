import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

interface HeroSectionProps {
  taskId: string;
  setTaskId: (value: string) => void;
  isLoading: boolean;
  handleSearch: () => void;
}

export default function HeroSection({
  taskId,
  setTaskId,
  handleSearch,
  isLoading,
}: HeroSectionProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <img className="h-10 rounded-md" src="logo-integra.svg" alt="" />
          </a>

          <Button variant="ghost" size="sm" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>

          <nav className="hidden md:flex gap-6">
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Soporte integra
            </a>
          </nav>

          <nav className="flex gap-6">
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-emerald-400/10">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Consulta el estado de tu soporte
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-md">
                  Consulta el estado de tus tickets de soporte.
                </p>
              </div>
              <div className="flex gap-2  w-full max-w-md space-y-2">
                <div className="relative flex-1 ">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    autoFocus
                    placeholder="Escribe tu codigo (e.j., 87knya)"
                    className="pl-8 dark:bg-neutral-800 bg-white"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                  />
                </div>
                <Button type="button" disabled={isLoading} onClick={handleSearch}>
                  Consultar
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-64">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Crear un soporte</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Crea un nuevo soporte para tu empresa.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.8a2 2 0 0 0 1.4-.6L12 4.6a2 2 0 0 1 1.4-.6h3.8a2 2 0 0 1 2 2v2.4Z" />
                      <path d="M12 10v6" />
                      <path d="M9 13h6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Complementa la información</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Algunas veces necesitamos complementar la información que nos
                  brindas.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Resuelve dudas </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Resuelve dudas de nuestros productos y servicios.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40 px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Integra Software.
          </p>
        </div>
      </footer>
    </div>
  );
}
