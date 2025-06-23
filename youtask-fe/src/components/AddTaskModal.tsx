import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Task } from "../models/Task.model";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  onAddTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      const newTask: Task = {
        title: title.trim(),
        description: description.trim(),
        status: "PENDING",
        createdDate: new Date().toISOString(),
      };

      onAddTask(newTask);
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Animated backdrop */}
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
              {/* Header with close button */}
              <div className="flex items-center justify-between mb-6">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Add New Task
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Form with staggered animations */}
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 hover:border-gray-400 transform focus:scale-[1.02] focus:outline-none focus:ring-2 input-ring"
                    style={{
                      borderColor: "var(--focus-border, #d1d5db)",
                    }}
                    onFocus={(e) => {
                      e.target.style.setProperty(
                        "--focus-border",
                        "oklch(62.3% 0.214 259.815)"
                      );
                    }}
                    onBlur={(e) => {
                      e.target.style.removeProperty("--focus-border");
                    }}
                    placeholder="Enter task title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="input-ring w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 hover:border-gray-400 resize-none transform focus:scale-[1.02] focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--focus-border, #d1d5db)",
                    }}
                    onFocus={(e) => {
                      e.target.style.setProperty(
                        "--focus-border",
                        "oklch(62.3% 0.214 259.815)"
                      );
                    }}
                    onBlur={(e) => {
                      e.target.style.removeProperty("--focus-border");
                    }}
                    placeholder="Describe your task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={!title.trim() || !description.trim()}
                  className="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 shadow-lg"
                  style={{
                    backgroundColor: "oklch(62.3% 0.214 259.815)",
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor =
                        "oklch(58% 0.214 259.815)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor =
                        "oklch(62.3% 0.214 259.815)";
                    }
                  }}
                >
                  Add Task
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTaskModal;
