import type { ClickUpComment, ClickUpTask } from "@/types/ClickUpTask";

interface Props {
  taskData: ClickUpTask;
  comments: ClickUpComment[];
  searchTaskId: string;
}

export const TaskDetail = ({ taskData, comments, searchTaskId }: Props) => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{taskData.name}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                taskData.status?.color || "bg-emerald-200"
              }`}
            >
              {taskData.status?.status || "No Status"}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-2">Descripción</h2>
              <div className="prose max-w-none">
                {taskData.description ? (
                  <p className="whitespace-pre-wrap">
                    {taskData.description}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    Sin descripción disponible.
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  URL del soporte
                </h2>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={`${window.location.origin}/?ticket=${searchTaskId}`}
                    className="flex-1 p-2 border rounded"
                    readOnly
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/?ticket=${searchTaskId}`
                      );
                    }}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {comments && comments.length > 0 && (
                <div className="mt-6 min-w-md">
                  <h2 className="text-lg font-semibold mb-4">Comments</h2>

                  <ul className="space-y-4">
                    {comments.map((comment) => (
                      <li key={comment.id} className="border-b pb-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            {comment.user.profilePicture ? (
                              <img
                                src={comment.user.profilePicture}
                                alt={comment.user.username}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                {comment.user.username
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">
                                {comment.user.username}
                              </h3>
                            </div>
                            <p className="mt-1">
                              {
                                typeof comment.comment === "string"
                                  ? comment.comment
                                  : Array.isArray(comment.comment)
                                  ? comment.comment.map((item, index) => (
                                      <span key={index}>{item.text}</span>
                                    ))
                                  : comment.comment_text /* Fallback to plain text version */
                              }
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded">
                <h2 className="text-lg font-semibold mb-2">Detalles</h2>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Task ID</dt>
                    <dd className="font-mono text-sm">{searchTaskId}</dd>
                  </div>

                  <div>
                    <dt className="text-sm text-gray-500">NIT</dt>
                    <dd>
                      {
                        taskData.custom_fields?.find(
                          (field) => field.name === "NIT"
                        )?.value
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm text-gray-500">Email</dt>
                    <dd>
                      {taskData.custom_fields?.find(
                        (field) => field.name === "Mail"
                      )?.value || "Sin email"}
                    </dd>
                  </div>
                </dl>
              </div>

              {taskData.assignees && taskData.assignees.length > 0 && (
                <div className="bg-gray-50 p-4 rounded">
                  <h2 className="text-lg font-semibold mb-2">
                    Asignado/s
                  </h2>
                  <ul className="space-y-2">
                    {taskData.assignees.map((assignee) => (
                      <li key={assignee.id} className="flex items-center">
                        {assignee.profilePicture ? (
                          <img
                            src={assignee.profilePicture}
                            alt={assignee.username}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            {assignee.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span>{assignee.username}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
