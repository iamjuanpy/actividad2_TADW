import { useEffect, useState } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const getMovies = async () => {
    setLoaded(false);
    const response = await axios.get(`http://localhost:3002/random`);
    const data = response.data;
    setMovies(data);
    setLoaded(true);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>

        {!isLoaded ? (
          <Spinner animation="border" />
        ) : (
          <Container>
            <Row xs={1} md={5} className="g-5">
              {movies.map((movie) => (
                <Col>
                  <Card key={movie.title}>
                    <Card.Img
                      variant="top"
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        movie.poster_path
                      }
                    />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>{movie.overview}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Button variant="outline-light" onClick={getMovies}>
              Get Movies
            </Button>
          </Container>
        )}
      </header>
    </div>
  );
}

export default App;
