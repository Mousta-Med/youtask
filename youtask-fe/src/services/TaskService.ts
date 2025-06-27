import http from "../http-common";
import type { Task } from "../models/Task.model";

const getAll = () => {
  return http.get<Array<Task>>("/task");
};

const getAllByUserId = (id: string) => {
  return http.get<Array<Task>>(`/task/all/${id}`);
};

const get = (id: string) => {
  return http.get<Task>(`/task/${id}`);
};

const create = (data: Task) => {
  return http.post<Task>("/task", data);
};

const update = (id: string | undefined, data: Task) => {
  return http.put<Task>(`/task/${id}`, data);
};

const remove = (id: string | undefined) => {
  return http.delete<void>(`/task/${id}`);
};

const TaskService = {
  getAll,
  getAllByUserId,
  get,
  create,
  update,
  remove,
};

export default TaskService;
