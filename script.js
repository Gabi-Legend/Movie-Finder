function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const searchButton = document.getElementById("searchBtn");
if (searchButton) {
  searchButton.addEventListener("click", () => {
    const movie_to_search = document.getElementById("searchMovie").value.trim();
    if (!movie_to_search) {
      alert("You have to type a movie!");
      return;
    }
    window.location.href = `movie.html?name=${encodeURIComponent(
      movie_to_search
    )}`;
  });
}

if (document.getElementById("movieName")) {
  document.addEventListener("DOMContentLoaded", () => {
    const movieName = getQueryParam("name");
    if (!movieName) {
      alert("No movie specified!");
      return;
    }

    fetch(
      `https://www.omdbapi.com/?apikey=f0928afe&t=${encodeURIComponent(
        movieName
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "False") {
          alert("Movie not found!");
          return;
        }
        document.getElementById("movieName").textContent = data.Title;
        document.getElementById("movieImage").src = data.Poster;
        document.getElementById(
          "imdbRating"
        ).textContent = `IMDb Rating: ${data.imdbRating}`;
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        alert("Failed to fetch movie data.");
      });
  });
}
