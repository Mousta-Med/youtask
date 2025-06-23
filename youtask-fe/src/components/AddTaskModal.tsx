import React, { useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import type { Task } from "../models/Task.model";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  selectedTask?: Task | null;
}

type FormValues = {
  title: string;
  description: string;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  onAddTask,
  onUpdateTask,
  selectedTask,
}) => {
  const isEditMode = !!selectedTask;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }, // ✅ extract isValid
  } = useForm<FormValues>({
    mode: "onChange", // ✅ to update validity on typing
  });

  useEffect(() => {
    if (isEditMode && selectedTask) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description,
      });
    } else {
      reset({
        title: "",
        description: "",
      });
    }
  }, [selectedTask, isEditMode, open, reset]);

  const onSubmit = (data: FormValues) => {
    if (isEditMode && selectedTask) {
      onUpdateTask({
        ...selectedTask,
        ...data,
        lastModifiedDate: new Date().toISOString(),
      });
    } else {
      onAddTask({
        ...data,
        status: "PENDING",
      });
    }
    onClose();
  };

  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
              <div className="flex items-center justify-between mb-6">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  {isEditMode ? "Update Task" : "Add New Task"}
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 input-ring"
                    placeholder="Enter task title..."
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none input-ring"
                    placeholder="Describe your task..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid} // ✅ disable if form is invalid
                    className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 shadow-lg ${
                      !isValid
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105 active:scale-95"
                    }`}
                    style={{
                      backgroundColor: "oklch(62.3% 0.214 259.815)",
                    }}
                  >
                    {isEditMode ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTaskModal;
