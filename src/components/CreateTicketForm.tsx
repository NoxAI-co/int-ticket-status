import { useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/mode-toggle";
import { useClickUpTask } from "@/hooks/useClickUpTask";
import { clickupService } from "@/services/clickupService";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Upload,
  X,
  FileText,
  CheckCircle2,
  Copy,
  Loader2,
  ExternalLink,
} from "lucide-react";

const SUPPORT_TYPES = [
  { value: "error", label: "Bug / Error técnico" },
  { value: "consulta", label: "Consulta general" },
  { value: "solicitud", label: "Solicitud de funcionalidad" },
  { value: "acceso", label: "Acceso / Permisos" },
  { value: "facturacion", label: "Facturación" },
  { value: "campana", label: "Campaña / Contenido" },
  { value: "otro", label: "Otro" },
];

const PRIORITIES = [
  { value: 1, label: "Urgente", color: "text-red-500", bg: "bg-red-500/10 border-red-500/30" },
  { value: 2, label: "Alta", color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30" },
  { value: 3, label: "Normal", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/30" },
  { value: 4, label: "Baja", color: "text-gray-500", bg: "bg-gray-500/10 border-gray-500/30" },
];

interface FormData {
  nombre: string;
  email: string;
  empresa: string;
  asunto: string;
  tipo: string;
  prioridad: number;
  descripcion: string;
}

const INITIAL_FORM: FormData = {
  nombre: "",
  email: "",
  empresa: "",
  asunto: "",
  tipo: "",
  prioridad: 3,
  descripcion: "",
};

export default function CreateTicketForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [files, setFiles] = useState<File[]>([]);
  const [createdTaskId, setCreatedTaskId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const { useCreateTask, useUploadAttachment } = useClickUpTask();
  const createTask = useCreateTask();
  const uploadAttachment = useUploadAttachment();

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      const merged = [...prev, ...accepted.filter((f) => !names.has(f.name))];
      if (merged.length > 5) {
        toast.error("Máximo 5 archivos permitidos");
        return merged.slice(0, 5);
      }
      return merged;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    maxSize: 20 * 1024 * 1024,
    maxFiles: 5,
    noClick: files.length > 0,
    noKeyboard: files.length > 0,
  });

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim()) next.nombre = "Campo requerido";
    if (!form.email.trim()) next.email = "Campo requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Email inválido";
    if (!form.empresa.trim()) next.empresa = "Campo requerido";
    if (!form.asunto.trim()) next.asunto = "Campo requerido";
    if (!form.tipo) next.tipo = "Selecciona un tipo";
    if (!form.descripcion.trim()) next.descripcion = "Campo requerido";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildDescription = (): string => {
    const tipoLabel =
      SUPPORT_TYPES.find((t) => t.value === form.tipo)?.label ?? form.tipo;
    return [
      `## Información de contacto`,
      `- **Empresa:** ${form.empresa}`,
      `- **Nombre:** ${form.nombre}`,
      `- **Email:** ${form.email}`,
      ``,
      `## Tipo de soporte`,
      tipoLabel,
      ``,
      `## Descripción`,
      form.descripcion,
    ].join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const task = await createTask.mutateAsync({
        name: form.asunto,
        markdown_description: buildDescription(),
        priority: form.prioridad,
      });

      if (files.length > 0) {
        await Promise.allSettled(
          files.map((file) =>
            clickupService.uploadAttachment(task.id, file)
          )
        );
      }

      setCreatedTaskId(task.id);
    } catch {
      // toast already shown by service
    }
  };

  const copyId = () => {
    if (!createdTaskId) return;
    navigator.clipboard.writeText(createdTaskId);
    toast.success("ID copiado al portapapeles");
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFiles([]);
    setErrors({});
    setCreatedTaskId(null);
  };

  const field = (key: keyof FormData) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value })),
  });

  if (createdTaskId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-violet-500/5 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-500/10 p-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">¡Ticket creado!</h2>
            <p className="text-muted-foreground text-sm">
              Tu solicitud de soporte fue registrada correctamente.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
            <p className="text-xs text-muted-foreground">ID de tu ticket</p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-lg font-semibold">{createdTaskId}</span>
              <button
                onClick={copyId}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Guarda este ID para consultar el estado de tu soporte.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/" search={{ ticket: createdTaskId }}>
              <Button className="w-full gap-2" variant="default">
                <ExternalLink className="h-4 w-4" />
                Ver estado del ticket
              </Button>
            </Link>
            <Button variant="outline" className="w-full" onClick={resetForm}>
              Crear otro ticket
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img className="h-10 rounded-md" src="logo-parley-media.svg" alt="Parley Media" />
          </Link>
          <nav className="flex gap-4 items-center">
            <Link
              to="/"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 py-10 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Crear ticket de soporte</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Completa el formulario y nuestro equipo te atenderá a la brevedad.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sección 1: Contacto */}
            <section className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Información de contacto
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Juan García"
                    {...field("nombre")}
                    className={errors.nombre ? "border-red-500" : ""}
                  />
                  {errors.nombre && (
                    <p className="text-xs text-red-500">{errors.nombre}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="juan@empresa.com"
                    {...field("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Empresa / Organización <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Nombre de tu empresa"
                  {...field("empresa")}
                  className={errors.empresa ? "border-red-500" : ""}
                />
                {errors.empresa && (
                  <p className="text-xs text-red-500">{errors.empresa}</p>
                )}
              </div>
            </section>

            {/* Sección 2: Detalles del ticket */}
            <section className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Detalles del soporte
              </h2>
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Asunto <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Resumen breve del problema o solicitud"
                  {...field("asunto")}
                  className={errors.asunto ? "border-red-500" : ""}
                />
                {errors.asunto && (
                  <p className="text-xs text-red-500">{errors.asunto}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Tipo de soporte <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.tipo}
                    onChange={(e) => setForm((p) => ({ ...p, tipo: e.target.value }))}
                    className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      errors.tipo ? "border-red-500" : "border-input"
                    }`}
                  >
                    <option value="">Selecciona un tipo</option>
                    {SUPPORT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {errors.tipo && (
                    <p className="text-xs text-red-500">{errors.tipo}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Prioridad</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, prioridad: p.value }))}
                        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
                          form.prioridad === p.value
                            ? `${p.bg} ${p.color} border-current`
                            : "border-input text-muted-foreground hover:border-muted-foreground"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Descripción detallada <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Describe el problema o solicitud con el mayor detalle posible. Incluye pasos para reproducir el error, capturas de pantalla relevantes, etc."
                  rows={5}
                  value={form.descripcion}
                  onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
                  className={errors.descripcion ? "border-red-500 resize-none" : "resize-none"}
                />
                {errors.descripcion && (
                  <p className="text-xs text-red-500">{errors.descripcion}</p>
                )}
              </div>
            </section>

            {/* Sección 3: Archivos */}
            <section className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <div>
                <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Archivos adjuntos
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Opcional · Máximo 5 archivos · 20 MB por archivo
                </p>
              </div>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-5 transition-colors cursor-pointer ${
                  isDragActive
                    ? "border-violet-500 bg-violet-500/5"
                    : files.length > 0
                    ? "border-muted bg-muted/20"
                    : "border-muted hover:border-muted-foreground/50"
                }`}
              >
                <input {...getInputProps()} />

                {files.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {isDragActive
                        ? "Suelta los archivos aquí"
                        : "Arrastra archivos o haz clic para seleccionar"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {files.length} archivo{files.length > 1 ? "s" : ""} seleccionado{files.length > 1 ? "s" : ""}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFiles([]); }}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Limpiar
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {files.map((file, i) => (
                        <motion.div
                          key={`${file.name}-${i}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center justify-between rounded-md border bg-background px-3 py-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="h-4 w-4 text-violet-500 flex-shrink-0" />
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {(file.size / 1024).toFixed(0)} KB
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setFiles((p) => p.filter((_, idx) => idx !== i)); }}
                            className="ml-2 text-muted-foreground hover:text-foreground flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {files.length < 5 && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); open(); }}
                        className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                      >
                        + Añadir más archivos
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={createTask.isPending}
            >
              {createTask.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando ticket...
                </>
              ) : (
                "Enviar ticket de soporte"
              )}
            </Button>
          </form>
        </div>
      </main>

      <footer className="border-t bg-muted/40 px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Parley Media.
        </p>
      </footer>
    </div>
  );
}
