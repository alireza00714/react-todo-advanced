import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

interface ISidebar {
  show: boolean;
  setShow: Function;
}

const Sidebar: React.FC<ISidebar> = ({ show, setShow }) => {
  const handleHide = () => setShow(false);
  return (
    <Offcanvas show={show} onHide={handleHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filters</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form.Select aria-label="Priority" className="mb-3">
          <option>Priority</option>
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
          <option value={0}>All</option>
        </Form.Select>
        <Form.Select aria-label="Status" className="mb-3">
          <option>Status</option>
          <option value={1}>Todo</option>
          <option value={2}>Doing</option>
          <option value={3}>Done</option>
          <option value={0}>All</option>
        </Form.Select>
        <Form.Select aria-label="Deadline">
          <option>Deadline</option>
          <option value={1}>Overdue</option>
          <option value={2}>For Today</option>
          <option value={3}>For the Future</option>
          <option value={0}>All</option>
        </Form.Select>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default Sidebar;
