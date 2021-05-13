import React from "react";

import { Navbar } from "react-bootstrap";
import "./style.css";

export default function Headers() {
  return (
    <Navbar className="top" bg="primary" variant="dark">
      <Navbar.Brand href="">Cadastro</Navbar.Brand>
    </Navbar>
  );
}
