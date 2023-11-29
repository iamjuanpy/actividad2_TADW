
import { useEffect, useState } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container, Spinner } from 'react-bootstrap';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const getMovies = async () => {
    const response = await fetch('https://swapi.dev/api/films');
    const data = await response.json();
    setMovies(data.results);
    setLoaded(true);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        
        { !isLoaded ? (
          <Spinner animation="border" />
        ):(
          <Container>
            <Row xs={1} md={5} className='g-5'>
              {movies.map((movie) => (
                <Col>
                  <Card key={movie.episode_id}>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
        </Container>
        )}

        <Button variant="outline-light" onClick={getMovies}>Get Movies</Button>
      </header>
    </div>
  );
}

export default App;
