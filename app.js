const form = document.querySelector("#searchForm");
const moviesWrapper = document.querySelector("#movies-wrapper");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (document.querySelector(".movie-wrapper")) {
        function removeMovieWrapper(className) {
            const elements = document.querySelectorAll(`.${className}`);
            elements.forEach((element) => element.remove());
        }
        removeMovieWrapper("movie-wrapper");
    }
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    createMovieWrapper(res.data);
    form.elements.query.value = "";
});

const createMovieWrapper = (results) => {
    let i = 1;
    for (let result of results) {
        const movieWrapper = document.createElement("div");
        movieWrapper.classList.add("movie-wrapper", `movie-wrapper${i}`);
        const movieName = document.createElement("div");
        movieName.classList.add("movie-name", `movie-name${i}`);
        const movieImage = document.createElement("div");
        movieImage.classList.add("movie-image", `movie-image${i}`);
        movieWrapper.append(movieName, movieImage);
        if (result.show.image) {
            const img = document.createElement("IMG");
            img.src = result.show.image.medium;
            movieImage.append(img);
        } 
        const name = result.show.name;
        movieName.innerText = name;
        moviesWrapper.append(movieWrapper);
        i += 1;
    }
};
