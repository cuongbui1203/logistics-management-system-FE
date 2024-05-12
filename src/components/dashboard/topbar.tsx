import BreadCrumb from './breadcrumb';
import { Container, Row } from 'react-bootstrap';
import '@/css/dashboard/topbar.css';
import Username from '../common/username';

export default function TopBar() {
  return (
    <nav className="nav topBar">
      <Container className="navBar">
        <Row className="breadCrumbContainer">
          <BreadCrumb />
        </Row>

        <Row>
          <Username />
        </Row>
      </Container>
    </nav>
  );
}
