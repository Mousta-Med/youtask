export interface Task {
  id?: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  createdDate?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}

export interface TaskGroup {
  [key: string]: Task[];
}
