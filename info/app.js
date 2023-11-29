const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/movie-info/:movieId", async (req, res) => {
  const tmdbApiKey = "157e8cdf37760ddcb6b7139dced48f72";
  const movieId = req.params.movieId;
  const tmdbUrl = `https://api.themoviedb.org/3/search/movie?query=${movieId}&api_key=${tmdbApiKey}`;

  try {
    const response = await axios.get(tmdbUrl);
    const movieInfo = response.data;
    res.json(movieInfo.results[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener la información de la película" });
  }
});

app.listen(port, () => {
  console.log(`Microservicio en ejecución en http://localhost:${port}`);
});
