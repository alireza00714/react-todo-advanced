import "./Table.styles.css";
import { Table } from "react-bootstrap";
import TableRow from "../TableRow/TableRow";
import { useEffect, useState } from "react";
import { ITask } from "../../types";

interface ITable {
  tasks: ITask[];
  setModalMode: Function;
  setIsModalOpen: Function;
  taskUsedId: number;
  setTaskUsedId: Function;
  formValue: ITask;
  setFormValue: Function;
}

const TableComponent: React.FC<ITable> = ({
  tasks,
  setModalMode,
  setIsModalOpen,
  taskUsedId,
  setTaskUsedId,
  formValue,
  setFormValue,
}) => {
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);
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
        {filteredTasks.map((filteredTask) => (
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
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
