export type modalMode = "add" | "view" | "edit" | "delete";
export type status = "done" | "todo" | "doing";
export type priority = "low" | "medium" | "high";
export interface ITask {
  id: number;
  task: string;
  status: status | "status";
  priority: priority | "priority";
  deadline: Date;
  details?: string;
}
