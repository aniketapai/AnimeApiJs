async function searchAnime() {
  const searchInput = document.querySelector("input[type='search']").value;
  if (!searchInput) return;

  try {
    const response = await fetch(
      `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${encodeURIComponent(
        searchInput
      )}&sortBy=ranking&sortOrder=asc`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "afddbcf044msh2879d75a500f308p1482bfjsnf0b87d3990fb",
          "x-rapidapi-host": "anime-db.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();
    document.getElementById("results").innerHTML = data.data
      .map(
        (anime) => `
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <div class="card h-100 text-center">
            <img src="${anime.image}" class="card-img-top mx-auto mt-2" style="height: 200px; object-fit: cover;" alt="${anime.title}">
            <div class="card-body p-2">
              <h6 class="card-title mb-1">${anime.title}</h6>
              <small class="text-muted">Rank: ${anime.ranking}</small>
            </div>
          </div>
        </div>
      `
      )
      .join(""); // Converts array into a single string
  } catch (error) {
    console.error("Error fetching anime:", error);
  }
}
