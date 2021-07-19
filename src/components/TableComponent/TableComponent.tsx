import "./Table.styles.css";
import { Table } from "react-bootstrap";
import TableRow from "../TableRow/TableRow";
import { useEffect, useState } from "react";
import { IFilter, ITask } from "../../types";
import TablePagination from "../TablePagination/TablePagination";

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
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks);
  const [tablePages, setTablePages] = useState<number>(1);
  const [pageItemsCount, setPageItemsCount] = useState<number>(5);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [fromItem, setFromItem] = useState<number>(
    pageItemsCount * (currentPageNumber - 1) + 1
  );
  const [toItem, setToItem] = useState<number>(
    tablePages === currentPageNumber
      ? filteredTasks.length
      : pageItemsCount * currentPageNumber
  );
  const [limitedTasks, setLimitedTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    setLimitedTasks(filteredTasks);
  }, [filteredTasks]);

  useEffect(() => {
    setTablePages(Math.ceil(filteredTasks.length / pageItemsCount));
  }, [filteredTasks.length, pageItemsCount]);

  useEffect(() => {
    const filteredAndSearchedItems = tasks
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
      })
      .filter((item) => item.task.includes(searchString));

    setFilteredTasks(filteredAndSearchedItems);
  }, [filters, tasks, searchString]);

  useEffect(() => {
    setLimitedTasks(() =>
      filteredTasks.filter(
        (item, index) => index + 1 <= toItem && index + 1 >= fromItem
      )
    );
  }, [filteredTasks, fromItem, toItem]);

  return (
    <>
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
          {limitedTasks.length !== 0 ? (
            limitedTasks.map((limitedTask) => (
              <TableRow
                key={limitedTask.id}
                taskId={limitedTask.id}
                taskName={limitedTask.task}
                taskStatus={limitedTask.status}
                taskPriority={limitedTask.priority}
                taskDeadline={limitedTask.deadline}
                taskDetails={limitedTask.details}
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
      <TablePagination
        tablePages={tablePages}
        setTablePages={setTablePages}
        filteredTasks={filteredTasks}
        setFilteredTasks={setFilteredTasks}
        pageItemsCount={pageItemsCount}
        setPageItemsCount={setPageItemsCount}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        fromItem={fromItem}
        setFromItem={setFromItem}
        toItem={toItem}
        setToItem={setToItem}
        setLimitedTasks={setLimitedTasks}
      />
    </>
  );
};

export default TableComponent;
