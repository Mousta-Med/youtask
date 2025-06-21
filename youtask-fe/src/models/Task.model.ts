export default interface Task {
  id?: string;
  title: string;
  description: string;
  status: "PENDENIG" | "IN_PROGRESS" | "COMPLETED";
  createdDate?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}
