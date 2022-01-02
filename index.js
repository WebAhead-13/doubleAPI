


const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
    createMeal(res.meals[0]);
  });
});

const createMeal = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for(let i=1; i<=20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  
  const newInnerHTML = `
    <div class="row">
      <div class="columns five">
        <img class="timg" src="${meal.strMealThumb}" alt="Meal Image">
        ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
        ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h5>Ingredients:</h5>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
      <div class="columns seven">
        <h4>${meal.strMeal}</h4>
        <p>${meal.strInstructions}</p>
      </div>
    </div>
    
  `;
  
  meal_container.innerHTML = newInnerHTML;
}


// -------------------movie API----------------------
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

var swiper=new swiper('.swiper-container',
slidesPerView:'auto',
spaceBetween:40,
centeredSlides:true,
grabCursor:true,
loop:true,
pagination:{
    el:'sw'
}
)