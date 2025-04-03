import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clickupService } from "../services/clickupService";

export function useClickUpTask() {
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
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!taskId,
    });
  };

  const useUploadAttachment = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ taskId, file }: { taskId: string; file: File }) =>
        clickupService.uploadAttachment(taskId, file),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["clickupTask", variables.taskId],
        });
      },
    });
  };

  return {
    useTaskDetails,
    useTaskComments,
    useUploadAttachment,
  };
}
