import { useState } from "react";
import { motion } from "framer-motion";
import { useClickUpTask } from "../hooks/useClickUpTask";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface CreateCommentProps {
  taskId: string;
}

export const CreateComment = ({ taskId }: CreateCommentProps) => {
  const [comment, setComment] = useState("");
  const { useAddComment } = useClickUpTask();
  const addCommentMutation = useAddComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await addCommentMutation.mutateAsync({
      taskId,
      comment: comment.trim(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-neutral-100 dark:border-neutral-700 pt-4 mt-4"
    >
      <form onSubmit={handleSubmit} className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center shadow-sm border-2 border-white dark:border-neutral-700">
            U
          </div>
        </div>
        <div className="flex-1 relative">
          {/* <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[80px] text-gray-700 dark:text-gray-300"
            disabled={addCommentMutation.isPending}
          /> */}
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Adicione un comentario..."
            className="ring-1 ring-neutral-600"
            disabled={addCommentMutation.isPending}
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <Button
              type="submit"
              disabled={!comment.trim() || addCommentMutation.isPending}
              className={`dark:bg-emerald-500/10 border-[1px] dark:border-emerald-500 dark:text-emerald-300 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2 hover:opacity-70 cursor-pointer ${
                !comment.trim() || addCommentMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {addCommentMutation.isPending ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};
