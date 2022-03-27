import MainRoutes from "./Routes";
import './assets/App.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="mt-5">
        <MainRoutes/>
    </Container>
  );
}

export default App;
