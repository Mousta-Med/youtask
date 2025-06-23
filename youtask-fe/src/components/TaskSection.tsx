import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import type { Task } from "../models/Task.model";
import TaskItem from "./TaskItem";

interface TaskSectionProps {
  title: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  tasks: Task[];
  count: number;
  onToggleComplete: (taskId: string) => void;
  onDelete: (id: string) => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  title,
  status,
  tasks,
  count,
  onDelete,
}) => {
  const getSectionBadgeStyles = (
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
  ) => {
    switch (status) {
      case "PENDING":
        return "bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80";
      case "IN_PROGRESS":
        return "text-orange-700 bg-orange-50 dark:bg-orange-500/15 dark:text-orange-400";
      case "COMPLETED":
        return "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-500";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-3 text-base font-medium text-gray-800 capitalize dark:text-white/90">
          {title}
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getSectionBadgeStyles(
              status
            )}`}
          >
            {count}
          </span>
        </h3>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] transition-colors ${
              snapshot.isDraggingOver ? "drag-over" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id || `task-${index}`}
                task={task}
                index={index}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskSection;
