import React, { useState, useEffect, useMemo } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import type { Task } from "../models/Task.model";
import TaskService from "../services/TaskService";
import TaskSection from "../components/TaskSection";
import toast from "react-hot-toast";
import AddTaskModal from "../components/AddTaskModal";
import { AxiosError } from "axios";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import {
  PlusIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const TaskManagerPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteRequest = (task: Task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    const user = localStorage.getItem("user");
    updatedTask.userId = user ? JSON.parse(user).id : null;
    try {
      const response = await TaskService.update(updatedTask.id, updatedTask);
      const updatedTaskData = response.data;
      setTasks((prev) => [...prev, updatedTaskData]);
      toast.success("Task added successfully");
      fetchTasks();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to add task";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleAddTask = async (newTask: Task) => {
    const user = localStorage.getItem("user");
    newTask.userId = user ? JSON.parse(user).id : null;
    try {
      const response = await TaskService.create(newTask);
      const createdTask = response.data;
      setTasks((prev) => [...prev, createdTask]);
      toast.success("Task added successfully");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to add task";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      setDeleteDialogOpen(false);
      setSelectedTask(null);
      await TaskService.remove(selectedTask.id);
      setTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
      toast.success("Task deleted successfully");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete task";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user") || "{}";
      if (token) {
        setLoading(true);
        setError(null);
        setTasks(JSON.parse(user).tasks || []);
      } else {
        setError("You must be logged in to view tasks");
        toast.error("You must be logged in to view tasks");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch tasks";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id: string, status: Task["status"]) => {
    const user = localStorage.getItem("user");
    try {
      const currentTask = tasks.find((task) => task.id === id);
      if (!currentTask) return;
      currentTask.userId = user ? JSON.parse(user).id : null;
      const updatedTaskData = {
        ...currentTask,
        status,
      };

      const response = await TaskService.update(id, updatedTaskData);
      const updatedTask = response.data;

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update task status";
      toast.error(errorMessage);
    }
  };

  const toggleTaskComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
    await updateTaskStatus(id, newStatus);
  };
  const taskGroups = useMemo(() => {
    return {
      PENDING: tasks.filter((task) => task.status === "PENDING"),
      IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
      COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
    };
  }, [tasks]);

  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      PENDING: tasks.filter((task) => task.status === "PENDING").length,
      IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS").length,
      COMPLETED: tasks.filter((task) => task.status === "COMPLETED").length,
    }),
    [tasks]
  );
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      await updateTaskStatus(
        draggableId,
        destination.droppableId as "PENDING" | "IN_PROGRESS" | "COMPLETED"
      );
    } else {
      const sourceStatus = source.droppableId as
        | "PENDING"
        | "IN_PROGRESS"
        | "COMPLETED";
      const sourceTasks = tasks.filter((task) => task.status === sourceStatus);
      const otherTasks = tasks.filter((task) => task.status !== sourceStatus);
      const reorderedSourceTasks = Array.from(sourceTasks);
      const [movedTask] = reorderedSourceTasks.splice(source.index, 1);
      reorderedSourceTasks.splice(destination.index, 0, movedTask);
      const newTasks = [...otherTasks, ...reorderedSourceTasks];
      setTasks(newTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading && !isRefreshing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            Something went wrong
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {error}
          </p>
          <button
            onClick={fetchTasks}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto max-w-7xl md:p-6">
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedTask?.title}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <AddTaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        selectedTask={selectedTask}
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col items-center px-4 py-5 xl:px-6 xl:py-6">
          <div className="flex flex-col w-full gap-5 sm:justify-between xl:flex-row xl:items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Task List
            </h2>
            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <button
                onClick={() => {
                  setSelectedTask(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm bg-blue-500 text-white shadow-sm hover:bg-blue-600 disabled:bg-blue-300"
              >
                Add New Task
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <ClipboardDocumentListIcon className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No tasks yet
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm">
              Get started by creating your first task. You can organize your
              work and track progress easily.
            </p>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedTask(null);
              }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-8 border-t border-gray-200 mt-7 dark:border-gray-800 sm:mt-0 xl:p-6">
            <DragDropContext onDragEnd={handleDragEnd}>
              <>
                <TaskSection
                  title="Pending"
                  status="PENDING"
                  tasks={taskGroups.PENDING}
                  count={taskCounts.PENDING}
                  onToggleComplete={toggleTaskComplete}
                  onDeleteRequest={handleDeleteRequest}
                  onEdit={handleEditTask}
                />

                <TaskSection
                  title="In Progress"
                  status="IN_PROGRESS"
                  tasks={taskGroups.IN_PROGRESS}
                  count={taskCounts.IN_PROGRESS}
                  onToggleComplete={toggleTaskComplete}
                  onDeleteRequest={handleDeleteRequest}
                  onEdit={handleEditTask}
                />

                <TaskSection
                  title="Completed"
                  status="COMPLETED"
                  tasks={taskGroups.COMPLETED}
                  count={taskCounts.COMPLETED}
                  onToggleComplete={toggleTaskComplete}
                  onDeleteRequest={handleDeleteRequest}
                  onEdit={handleEditTask}
                />
              </>
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagerPage;
