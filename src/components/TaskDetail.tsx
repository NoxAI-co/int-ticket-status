import type { ClickUpComment, ClickUpTask } from "@/types/ClickUpTask";
import { TicketIcon, ClipboardCopy, Mail, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import toast from "react-hot-toast";
import DropzoneActions from "./DropzoneActions";

interface Props {
  taskData: ClickUpTask;
  comments: ClickUpComment[];
  searchTaskId: string;
}

export const TaskDetail = ({ taskData, comments, searchTaskId }: Props) => {
  return (
    <div className="p-6 to-white dark:bg-neutral-900 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-2 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                <span className="font-mono">#{searchTaskId}</span>
                {/* <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                <span>{new Date().toLocaleDateString()}</span> */}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white max-w-[250px] md:max-w-4xl text-nowrap whitespace-nowrap overflow-hidden text-ellipsis ">
                      {taskData.name}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent>{taskData.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium capitalize bg-opacity-10"
                style={{
                  backgroundColor: `${taskData.status?.color}15` || "#f3f4f6",
                  color: taskData.status?.color || "#6b7280",
                  border: `1px solid ${taskData.status?.color}30` || "#e5e7eb",
                }}
              >
                <TicketIcon className="h-4 w-4" />
                <span>{taskData.status?.status || "No Status"}</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-5 w-1 rounded-full bg-indigo-500"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Descripción
                  </h2>
                </div>
                <div className="prose max-w-none">
                  {taskData.description ? (
                    <p className="whitespace-pre-wrap max-h-80 overflow-y-auto text-gray-700 dark:text-gray-300 leading-relaxed">
                      {taskData.description}
                    </p>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 italic">
                      Sin descripción disponible.
                    </p>
                  )}
                </div>
              </motion.div>

              {taskData.attachments && taskData.attachments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-1 rounded-full bg-cyan-400"></div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Archivos
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {taskData.attachments.map((attachment, index) => (
                      <motion.div
                        key={attachment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 * index }}
                        className="flex items-center gap-2 bg-gray-50/80 dark:bg-neutral-700/80 border border-neutral-100 dark:border-neutral-600 rounded-lg p-3 shadow-sm"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-gray-100/80 dark:bg-neutral-700/80 flex items-center justify-center">
                            <img
                              src={attachment.url}
                              alt={attachment.title}
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {attachment.date}.{attachment.extension}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => {
                              window.open(attachment.url, "_blank");
                            }}
                            className="dark:bg-emerald-500/10 border-[1px] dark:border-emerald-500 dark:text-emerald-300 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2 hover:opacity-70 cursor-pointer"
                          >
                            <span>Descargar</span>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-5 w-1 rounded-full bg-blue-500"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    URL del soporte
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={`${window.location.origin}/?ticket=${searchTaskId}`}
                    className="flex-1 bg-white/80 dark:bg-neutral-700/80 border-neutral-200 dark:border-neutral-600 font-mono text-sm dark:text-gray-200"
                    readOnly
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/?ticket=${searchTaskId}`
                      );
                      toast("Copiado!", {
                        icon: "✔️",
                        position: "bottom-center",
                        style: {
                          borderRadius: "10px",
                          background: "#333",
                          color: "#fff",
                        },
                      });
                    }}
                    className="dark:bg-emerald-500/10 border-[1px] dark:border-emerald-500 dark:text-emerald-300 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2 hover:opacity-70 cursor-pointer"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                    <span>Copiar</span>
                  </Button>
                </div>
              </motion.div>

              {comments && comments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-1 rounded-full bg-green-500"></div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Comentarios
                    </h2>
                  </div>

                  <ul className="space-y-5">
                    {comments.map((comment, index) => (
                      <motion.li
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 * index }}
                        className="border-b border-neutral-100 dark:border-neutral-700 pb-5 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {comment.user.profilePicture ? (
                              <div className="rounded-full overflow-hidden border-2 border-white dark:border-neutral-700 shadow-sm">
                                <img
                                  src={comment.user.profilePicture}
                                  alt={comment.user.username}
                                  className="w-10 h-10 object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center shadow-sm border-2 border-white dark:border-neutral-700">
                                {comment.user.username.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {comment.user.username}
                              </h3>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {
                                typeof comment.comment === "string"
                                  ? comment.comment
                                  : Array.isArray(comment.comment)
                                  ? comment.comment.map((item, index) => (
                                      <span key={index}>{item.text}</span>
                                    ))
                                  : comment.comment_text /* Fallback to plain text version */
                              }
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-5 w-1 rounded-full bg-purple-500"></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Detalles
                  </h2>
                </div>
                <dl className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-neutral-700/80 border border-neutral-100 dark:border-neutral-600">
                    <TicketIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        ID Soporte
                      </dt>
                      <dd className="font-mono text-sm text-gray-900 dark:text-gray-200">
                        {searchTaskId}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-neutral-700/80 border border-neutral-100 dark:border-neutral-600">
                    <Building2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        NIT
                      </dt>
                      <dd className="text-sm text-gray-900 dark:text-gray-200">
                        {taskData.custom_fields?.find(
                          (field) => field.name === "NIT"
                        )?.value || "Sin NIT"}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 dark:bg-neutral-700/80 border border-neutral-100 dark:border-neutral-600">
                    <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Email
                      </dt>
                      <dd className="text-sm text-gray-900 dark:text-gray-200 break-all">
                        {taskData.custom_fields?.find(
                          (field) => field.name === "Mail"
                        )?.value || "Sin email"}
                      </dd>
                    </div>
                  </div>
                </dl>
              </motion.div>
              {taskData.assignees && taskData.assignees.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-1 rounded-full bg-amber-500"></div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Asignado/s
                    </h2>
                  </div>

                  <motion.div
                    className="flex -space-x-[0.9rem]"
                    whileHover={{
                      gap: "1rem",
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                  >
                    {taskData.assignees.map((assignee, index) =>
                      assignee.profilePicture ? (
                        <motion.img
                          key={index}
                          className="ring-background rounded-full ring-2"
                          src={assignee.profilePicture}
                          width={48}
                          title={assignee.username}
                          height={48}
                          alt={assignee.username}
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        />
                      ) : (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                          title={assignee.username}
                          className="ring-background rounded-full ring-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white text-lg font-medium"
                        >
                          {assignee.username.charAt(0).toUpperCase()}
                        </motion.div>
                      )
                    )}
                  </motion.div>
                </motion.div>
              )}

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-1 rounded-full bg-emerald-300"></div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Acciones necesarias
                    </h2>
                  </div>

                  <div>
                    <DropzoneActions taskId={searchTaskId} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
