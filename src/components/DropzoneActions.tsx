import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { useClickUpTask } from "../hooks/useClickUpTask";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface DropzoneActionsProps {
  taskId: string;
}

const DropzoneActions = ({ taskId }: DropzoneActionsProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const clickUpTask = useClickUpTask();
  const uploadAttachmentMutation = clickUpTask.useUploadAttachment();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Append new files to existing ones instead of replacing them
    setFiles((prevFiles) => {
      // Create a map of existing filenames to avoid duplicates
      const existingFileNames = new Map(prevFiles.map((f) => [f.name, f]));

      // Add new files that don't already exist in the array
      acceptedFiles.forEach((file) => {
        if (!existingFileNames.has(file.name)) {
          existingFileNames.set(file.name, file);
        }
      });

      // Convert map values back to array and limit to maxFiles
      const updatedFiles = Array.from(existingFileNames.values());

      // If we exceed the max files limit, show a toast and trim the array
      if (updatedFiles.length > 3) {
        toast.error(`Solo se permiten 3 archivos como máximo`);
        return updatedFiles.slice(0, 3);
      }

      return updatedFiles;
    });

    setUploadStatus("idle");
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 10485760,
    maxFiles: 3,
    noClick: files.length > 0,
    noKeyboard: files.length > 0,
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploadStatus("uploading");

    try {
      for (const file of files) {
        await uploadAttachmentMutation.mutateAsync({ taskId, file });
      }

      setUploadStatus("success");
      setFiles([]);

      toast.success("Archivo/s subido/s con éxito");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      toast.error("Error interno al subir el archivo");
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    if (files.length === 1) {
      setUploadStatus("idle");
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setUploadStatus("idle");
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-neutral-900/20"
            : files.length > 0
            ? "border-gray-300 bg-gray-50 dark:border-neutal-700 dark:bg-neutral-800/50"
            : "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
        }`}
      >
        <input {...getInputProps()} />

        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              {isDragActive
                ? "Suelta los archivos aquí"
                : "Arrastra y suelta los archivos aquí"}
            </p>
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-1">
              Solo se permiten imagenes de maximo 10MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Archivos agregados ({files.length})
              </h3>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFiles();
                }}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Borrar todos
              </button>
            </div>

            <ul className="space-y-2 max-h-60 overflow-y-auto">
              <AnimatePresence initial={false}>
                {files.map((file, index) => (
                  <motion.li
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between bg-white dark:bg-neutral-800 p-2 rounded border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-neutral-700 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-800"
              >
                Añadir más
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpload();
                }}
                disabled={uploadStatus === "uploading"}
                className={`px-3 py-1.5 text-sm rounded-md space-x-1  dark:bg-emerald-500/10 border-[1px] dark:border-emerald-500 dark:text-emerald-300 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2 hover:opacity-70 ${
                  uploadStatus === "uploading" &&
                  "opacity-40 hover:opacity-40 cursor-not-allowed"
                }`}
              >
                {uploadStatus === "uploading" ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Subiendo...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Subir</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {uploadStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm rounded-md flex items-center"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Archivos subidos con éxito!
        </motion.div>
      )}

      {uploadStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded-md flex items-center"
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Failed to upload files. Please try again.
        </motion.div>
      )}
    </div>
  );
};

export default DropzoneActions;
