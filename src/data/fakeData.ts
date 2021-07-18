import { ITask } from "../types";

const data: ITask[] = [
  {
    id: 1,
    task: "help mom",
    status: "todo",
    priority: "high",
    deadline: new Date("2020-02-14 00:00:00:00"),
  },
  {
    id: 2,
    task: "go shopping",
    status: "todo",
    priority: "medium",
    deadline: new Date("2021-07-19 00:00:00:00"),
  },
  {
    id: 3,
    task: "sleep",
    status: "doing",
    priority: "high",
    deadline: new Date("2021-07-18 00:00:00:00"),
  },
  {
    id: 4,
    task: "go restaurant",
    status: "done",
    priority: "low",
    deadline: new Date("2021-08-17 00:00:00:00"),
  },
];
export default data;
