document.getElementById("searchBtn").addEventListener("click",searchMovie);

function searchMovie(){
    const movieName = document.getElementById('movie_input').value.trim()
    const apiKey =  '61f4198d'
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`

    if(!movieName){
        showError("Please enter a movie title..")
        return
    }
fetch(url)
    .then(response => response.json())
    .then(data =>{
        if(data.Response === "False") {
            showError("Movie not found. Try another title." )
            return
        }
         
        document.getElementById('movieTitle').textContent = data.Title
        document.getElementById('movieYear').textContent =`Released: ${data.Year}`
        document.getElementById('moviePlot').textContent = data.Plot
        document.getElementById('moviePoster').src =data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450?text=No+Image"
        document.getElementById('movieInfo').style.display = 'block'
        document.getElementById('errorMsg').classList.add('d-none')
     
    })
    .catch(error => {
        showError("An error occured .Please try again later.")
        console.error(error)
    })
}

function showError(message) {
  document.getElementById('movieInfo').style.display = 'none'
  const errorBox = document.getElementById('errorMsg')
  errorBox.textContent = message
  errorBox.classList.remove('d-none')
}
