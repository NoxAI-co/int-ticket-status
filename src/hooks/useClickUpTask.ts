import { useQuery } from "@tanstack/react-query";
import { clickupService } from "../services/clickupService";

export function useClickUpTask() {
  //   const queryClient = useQueryClient();

  const useTaskDetails = (taskId: string) => {
    return useQuery({
      queryKey: ["clickupTask", taskId],
      queryFn: () => clickupService.getTaskDetails(taskId),
      enabled: !!taskId,
      retry: false,
      // staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
  };


  const useTaskComments = (taskId: string) => {
    return useQuery({
      queryKey: ["clickupComments", taskId],
      queryFn: () => clickupService.getTaskComments(taskId),
      enabled: !!taskId,
    });
  };

  //   const useAddComment = () => {
  //     return useMutation({
  //       mutationFn: ({ taskId, comment }: { taskId: string; comment: string }) =>
  //         clickupService.addComment(taskId, comment),
  //       onSuccess: (_, variables) => {
  //         // Invalidate comments query to refresh the list
  //         queryClient.invalidateQueries({ queryKey: ['clickupComments', variables.taskId] });
  //       },
  //     });
  //   };

  //   const useUploadAttachment = () => {
  //     return useMutation({
  //       mutationFn: ({ taskId, file }: { taskId: string; file: File }) =>
  //         clickupService.uploadAttachment(taskId, file),
  //       onSuccess: (_, variables) => {
  //         // Invalidate task query to refresh attachments
  //         queryClient.invalidateQueries({ queryKey: ['clickupTask', variables.taskId] });
  //       },
  //     });
  //   };

  return {
    useTaskDetails,
    useTaskComments,
    // useAddComment,
    // useUploadAttachment,
  };
}
