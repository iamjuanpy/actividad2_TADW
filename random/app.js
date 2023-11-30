const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;

// Función para obtener cinco películas al azar desde MyMovies
async function obtenerCincoPeliculasAzar() {
  try {
    const response = await axios.get('http://mymovies:3000/list');
    if (response.status === 200) {
      const peliculas = response.data;
      const peliculasAzar = peliculas.length >= 5 ? peliculas.slice(0, 5) : peliculas;
      return peliculasAzar;
    } else {
      console.error('Error al obtener las películas al azar:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error de conexión:', error.message);
    return [];
  }
}

// Función para obtener información de las películas
async function obtenerInfoPeliculas(peliculas) {
  try {
    const movieInfo = [];
    for (const pelicula of peliculas) {
      const response = await axios.get(`http://info:3001/movie-info/${pelicula.name}`);
      if (response.status === 200) {
        const info = response.data;
        const movieData = {
          title: info.title || '',
          overview: info.overview || '',
          poster_path: info.poster_path || '',
        };
        movieInfo.push(movieData);
      } else {
        console.error(`Error al obtener información de la película ${pelicula.name}: ${response.status}`);
        movieInfo.push({});
      }
    }
    return movieInfo;
  } catch (error) {
    console.error('Error de conexión:', error.message);
    return [];
  }
}

// Endpoint para obtener información de películas
app.get('/random', async (req, res) => {
  const cincoPeliculasAzar = await obtenerCincoPeliculasAzar();
  const infoCincoPeliculas = await obtenerInfoPeliculas(cincoPeliculasAzar);
  res.json(infoCincoPeliculas);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});