import React from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Container, Col, Row, Navbar, Nav, Table, Button, Badge, Dropdown } from 'react-bootstrap';

const Panel = () => {
  const [machineMetrics, setMachineMetrics] = React.useState({"metrics": []});
  const [isLoading, setIsLoading] = React.useState(false);
  const [timeOptionSelected, setTimeOptionSelected] = React.useState(1);
  const [millisecondsTime, setMillisecondsTime] = React.useState(60000);

  let totalRows = 0;
  let statesColor = {
    'On - loaded': 'success',
    'On - idle': 'info',
    'On - unloaded': 'warning',
    'Off': 'danger',
  };

  function changeIntervalTimeMinutes(minutesSelected = 1) {
    setTimeOptionSelected(minutesSelected);
    setMillisecondsTime(minutesSelected * 60 * 1000);
  }

  function getAxiosMachineMetrics (totalRowsToAdd = 0, machineName = 'pump') {
    setIsLoading(true);
    totalRows = totalRowsToAdd > 0 ? machineMetrics.metrics.length + totalRowsToAdd : 5;

    axios
      .get("http://localhost/api/machines/" + machineName + "/metric?current_quantity_rows=" + totalRows)
      .then((response) => {
        setMachineMetrics(response.data); 
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
     });
  }

  React.useEffect(() => {
    getAxiosMachineMetrics(5);

    const interval = setInterval(() => {
        getAxiosMachineMetrics(5);
    }, millisecondsTime);
  
    return () => clearInterval(interval);
  }, [millisecondsTime]);

  const metricsUI = (
    <div>
      {/* Second title */}
      <Row lg={12} className="mt-5 justify-content-md-center">
        <Col md="auto"><h3><Badge bg={statesColor[machineMetrics.last_state]}>{machineMetrics.last_state}</Badge></h3></Col>
      </Row>

      {/* Table */}
      <Row lg={12} className="mt-5">
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Datetime</th>
                <th>Value (Amps)</th>
                <th>Operating Load %</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {machineMetrics.metrics.map((metric, id) => (
                <tr key={id}>
                  <td>{metric.datetime_created}</td>
                  <td>{metric.psum_avg_value}</td>
                  <td>{metric.operating_load_percentage}</td>
                  <td>{metric.state}</td>
                </tr>
              ))}
              <tr>
                {machineMetrics.total_rows !== machineMetrics.metrics.length && <td colSpan={4}><Button variant="link" onClick={() => getAxiosMachineMetrics(5)}>See more...</Button></td>}
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );

  const noDataUI = (
    <Row lg={12} className="mt-5 justify-content-md-center">
      <Col md="auto"><h3><Badge bg="secondary">There is not data to show</Badge></h3></Col>
    </Row>
  );

  const renderUI = machineMetrics.metrics.length === 0 ? noDataUI : metricsUI;

  return (
    <>
    {/* Main title */}
    <Row lg={12}>
      <Col xs={12} md={8}><h1>{machineMetrics.machine_name} Dashboard</h1></Col>
      <Col xs={12} md={4} className="d-flex justify-content-end" >
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Machines
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => getAxiosMachineMetrics()} href="#">Pump</Dropdown.Item>
          <Dropdown.Item href="#">Compressor</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Col>
    </Row>

    {/* Options */}
    
    <Navbar className="mt-3" collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Refresh each:</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={timeOptionSelected === 1 ? 'underline-menu-option' : ''} onClick={() => changeIntervalTimeMinutes()} href="#">1min</Nav.Link>
            <Nav.Link className={timeOptionSelected === 5 ? 'underline-menu-option' : ''} onClick={() => changeIntervalTimeMinutes(5)} href="#">5min</Nav.Link>
            <Nav.Link className={timeOptionSelected === 10 ? 'underline-menu-option' : ''} onClick={() => changeIntervalTimeMinutes(10)} href="#">10min</Nav.Link>
            <Nav.Link onClick={() => getAxiosMachineMetrics()} href="#">Now</Nav.Link>
            <Nav.Link href="#">Export <i className="bi-alarm"></i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {isLoading ? <Spinner /> : renderUI}
    </>
  );
};

export default Panel;
