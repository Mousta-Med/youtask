import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../models/Task.model";
import {
  Bars3Icon,
  CalendarDaysIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

interface TaskItemProps {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onDelete,
  onEdit,
}) => {
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
            <div className="group flex items-start gap-4 transition-all duration-200">
              <span
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing mt-1 transition-colors duration-200"
                {...provided.dragHandleProps}
                aria-label="Drag to reorder task"
              >
                <Bars3Icon className="w-5 h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-base font-medium transition-all duration-200 ${
                        isCompleted
                          ? "text-gray-500 line-through dark:text-gray-400"
                          : "text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-100"
                      }`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p
                        className={`mt-2 text-sm leading-relaxed transition-colors duration-200 ${
                          isCompleted
                            ? "text-gray-400 dark:text-gray-500"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 transition-opacity duration-200">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all duration-200"
                      aria-label="Edit task"
                      title="Edit task"
                      onClick={() => onEdit(task)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDelete(task.id!)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                      aria-label="Delete task"
                      title="Delete task"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
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
