import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-body-tertiary pt-5" data-bs-theme="light">
      <Container>
        {/* Columns */}
        <Row>
          <Col className="column-1 text-center">
            <h4>Contact information</h4>
            <ul className="list-unstyled">
              <li>Email adress</li>
              <li>Phone number</li>
              <li>Adress</li>
            </ul>
          </Col>
          <Col className="column-2 text-center">
            <h4>Navigation links</h4>
            <ul className="list-unstyled">
              <li>About</li>
              <li>Services</li>
              <li>News</li>
              <li>Contact us</li>
            </ul>
          </Col>
          <Col className="column-3 text-center">
            <h4>Social media</h4>
            <ul className="list-unstyled">
              <li>Linkedin</li>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </Col>
          <Col className="column-4 text-center">
            <h4>Legal links</h4>
            <ul className="list-unstyled">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </Col>
        </Row>
        {/* Copyright */}
        <Row>
          <Col className="copyright text-center">&copy; 2025 Homi. All rights reserved</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;
