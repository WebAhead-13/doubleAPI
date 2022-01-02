
const api_url="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=39390d335495938eea2ecbf6351925e4";
const IMG_URL='https://image.tmdb.org/t/p/w500';
const main=document.getElementById('main');
const form=document.querySelector('form');

const searchURL='https://api.themoviedb.org/3/search/movie?api_key=39390d335495938eea2ecbf6351925e4';
const search=document.getElementById('search');
getMovies(api_url);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        showMovies(data.results);
    })
}
function showMovies(data){
   main.innerHTML= '';

    data.forEach(movie=>{
        const {title, poster_path, vote_average}=movie;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
        <img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="green">${vote_average}</span>
        </div>

        
        `
        main.appendChild(movieEl);
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=search.value;
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(api_url);
    }
})

