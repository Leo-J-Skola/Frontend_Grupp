import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
<<<<<<< HEAD
    <footer className="bg-body-tertiary pt-5" data-bs-theme="light">
=======
    <footer>
>>>>>>> f119835f488c6de22a03c14c1ac68f9348bc2fb3
      <Container>
        {/* Columns */}
        <Row>
          <Col className="column-1">
            <h4>Column 1</h4>
            <ul className="list-unstyled">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
            </ul>
          </Col>
          <Col className="column-2">
            <h4>Column 2</h4>
            <ul className="list-unstyled">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
            </ul>
          </Col>
        </Row>
        {/* Copyright */}
        <Row>
          <Col className="copyright">&copy; Copyright Homi App 2025. All rights reserved</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;
