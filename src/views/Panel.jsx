import React from "react";
//import PanelComp from "../components/Panel";
import { Container, Col, Row, Navbar, Nav, Table } from 'react-bootstrap';

const Panel = () => {
  return (
    <>
    {/* Main title */}
    <Row lg={12}>
      <Col><h1>Machine 1 Dashboard</h1></Col>
    </Row>

    {/* Options */}
    <Row lg={12} className="mt-3">
      <Col>
        <Navbar bg="light" variant="light">
          <Container>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
          </Container>
        </Navbar>
      </Col>
    </Row>

    {/* Second title */}
    <Row lg={12} className="mt-5 justify-content-md-center">
      <Col md="auto"><h3>ON - LOADED</h3></Col>
    </Row>

    {/* Table */}
    <Row lg={12} className="mt-5">
      <Col>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
    </>
  );
};

export default Panel;
