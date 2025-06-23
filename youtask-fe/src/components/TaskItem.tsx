import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../models/Task.model";
import { Bars3Icon, CalendarDaysIcon } from "@heroicons/react/24/outline";

interface TaskItemProps {
  task: Task;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const isCompleted = task.status === "COMPLETED";

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <Draggable draggableId={task.id || `task-${index}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-5 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm dark:border-gray-800 dark:bg-white/5 ${
            snapshot.isDragging ? "dragging" : ""
          }`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <span
                className="text-gray-400 cursor-grab active:cursor-grabbing mt-1"
                {...provided.dragHandleProps}
              >
                <Bars3Icon className="w-5 h-5" />
              </span>

              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h4
                      className={`text-base font-medium ${
                        isCompleted
                          ? "text-gray-500 line-through dark:text-gray-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p
                        className={`mt-1 text-sm ${
                          isCompleted
                            ? "text-gray-400 dark:text-gray-500"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 ml-9">
              <div className="flex items-center gap-4">
                {task.createdDate && (
                  <span className="flex items-center gap-1">
                    <CalendarDaysIcon className="w-4 h-4" />
                    {formatDate(task.createdDate)}
                  </span>
                )}
              </div>

              {task.lastModifiedDate && (
                <span className="text-xs">
                  Updated: {formatDate(task.lastModifiedDate)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
