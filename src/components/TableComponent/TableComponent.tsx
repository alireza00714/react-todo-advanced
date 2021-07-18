import "./Table.styles.css";
import { Table } from "react-bootstrap";
import TableRow from "../TableRow/TableRow";
import { useEffect, useState } from "react";
import { IFilter, ITask } from "../../types";

interface ITable {
  tasks: ITask[];
  setModalMode: Function;
  setIsModalOpen: Function;
  taskUsedId: number;
  setTaskUsedId: Function;
  formValue: ITask;
  setFormValue: Function;
  filters: IFilter;
  searchString: string;
}

const TableComponent: React.FC<ITable> = ({
  tasks,
  setModalMode,
  setIsModalOpen,
  taskUsedId,
  setTaskUsedId,
  formValue,
  setFormValue,
  filters,
  searchString,
}) => {
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const searchedItems = tasks.filter((item) =>
      item.task.includes(searchString)
    );
    setFilteredTasks(searchedItems);
  }, [searchString, tasks]);

  useEffect(() => {
    const filteredItems = tasks
      .filter((item) => {
        if (filters.status === "all") return true;
        if (item.status === filters.status) return true;
        return false;
      })
      .filter((item) => {
        if (filters.priority === "all") return true;
        if (filters.priority === item.priority) return true;
        return false;
      })
      .filter((item) => {
        let deadlineStatus = filters.deadline;
        const deadlineMilliSeconds = item.deadline.setHours(0, 0, 0, 0);
        const todayMilliSeconds = new Date(Date.now()).setHours(0, 0, 0, 0);
        switch (deadlineStatus) {
          case "all":
            return true;
          case "forFuture":
            return deadlineMilliSeconds > todayMilliSeconds && true;
          case "forToday":
            return deadlineMilliSeconds === todayMilliSeconds && true;
          case "overdue":
            return deadlineMilliSeconds < todayMilliSeconds && true;
        }
        return false;
      });

    setFilteredTasks(filteredItems);
  }, [filters, tasks]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Task</th>
          <th className="text-center">Priority</th>
          <th className="text-center">Status</th>
          <th className="text-center">Deadline</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredTasks.length !== 0 ? (
          filteredTasks.map((filteredTask) => (
            <TableRow
              key={filteredTask.id}
              taskId={filteredTask.id}
              taskName={filteredTask.task}
              taskStatus={filteredTask.status}
              taskPriority={filteredTask.priority}
              taskDeadline={filteredTask.deadline}
              taskDetails={filteredTask.details}
              setModalMode={setModalMode}
              setIsModalOpen={setIsModalOpen}
              taskUsedId={taskUsedId}
              setTaskUsedId={setTaskUsedId}
              formValue={formValue}
              setFormValue={setFormValue}
            />
          ))
        ) : (
          <tr className="no-task">
            <td colSpan={5}>No matching item found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TableComponent;
