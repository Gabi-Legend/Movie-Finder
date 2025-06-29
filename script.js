//Made by GabiLegend with love:D
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
        document.getElementById("year").textContent = data.Year;
        document.getElementById("runtime").textContent = data.Runtime;
        document.getElementById("genre").textContent = data.Genre;
        document.getElementById("director").textContent = data.Director;
        document.getElementById("actors").textContent = data.Actors;
        document.getElementById("language").textContent = data.Language;
        document.getElementById("country").textContent = data.Country;
        document.getElementById("imdbRating").textContent = data.imdbRating;
        document.getElementById("votes").textContent = data.imdbVotes;
        document.getElementById("plot").textContent = data.Plot;

        const website = document.getElementById("website");
        if (data.Website && data.Website !== "N/A") {
          website.href = data.Website;
          website.textContent = data.Website;
        } else {
          website.textContent = "N/A";
          website.removeAttribute("href");
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        alert("Failed to fetch movie data.");
      });
  });
}
