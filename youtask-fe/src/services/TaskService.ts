import http from "../http-common";
import type { Task } from "../models/Task.model";

const getAll = () => {
  return http.get<Array<Task>>("/task");
};

const get = (id: string) => {
  return http.get<Task>(`/task/${id}`);
};

const create = (data: Task) => {
  return http.post<Task>("/task", data);
};

const update = (id: string, data: Task) => {
  return http.put<Task>(`/task/${id}`, data);
};

const remove = (id: string) => {
  return http.delete<void>(`/task/${id}`);
};

const TaskService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default TaskService;
