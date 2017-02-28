//storing HTML elements using Object literal to be albe to call them and to have them in the same namespace
const elem = {
	moviesToShow: document.getElementById("moviesToShow"),
	showAllMoviesButton: document.getElementById("showAllMoviesButton"),
	topRatedButton: document.getElementById("topRatedButton"),
	bottomRatedButton: document.getElementById("bottomRatedButton"),
	thisYearButton: document.getElementById("thisYearButton"),
	byGenreButton: document.getElementById("byGenreButton"),
	addMovieButton: document.getElementById("addMovieButton"),
	genreList: document.getElementById("genreList"),
	addGenre: document.getElementById("addGenre"),
	rateGenre: document.getElementById("rateGenre"),
	newTitle: document.getElementById("newTitle"),
	newYear: document.getElementById("newYear"),
	newGenre: document.getElementById("newGenre"),
	newRating: document.getElementById("newRating"),
	newTime: document.getElementById("newTime")
};

//calling functions when clicking an HTML element
elem.showAllMoviesButton.addEventListener("click", function(){
	var allTheMovies = movieDataBase.showAllMovies();//creating a variable that calls a function. the variable is later returned with a value
	allTheMovies.forEach(function(mov){//function for calling next function when the value is an array
		movieDataBase.showThem(mov);//calling the function that shows the values on the HTML page
	});
});

elem.topRatedButton.addEventListener("click", function(){
	var topMovie = movieDataBase.getTopRated();
	movieDataBase.showThem(topMovie); 
});

elem.bottomRatedButton.addEventListener("click", function(){
	var bottomMovie = movieDataBase.getBottomRated();
	movieDataBase.showThem(bottomMovie);
});

elem.thisYearButton.addEventListener("click", function(){
	var thisYear = movieDataBase.getMoviesThisYear();
	thisYear.forEach(function(mov){
		movieDataBase.showThem(mov);
	});
});

elem.byGenreButton.addEventListener("click", function(){//not yet ready
	var theGenres = movieDataBase.getMoviesThisYear();
	theGenres.forEach(function(mov){
		showThem(mov);
	});
});

elem.addMovieButton.addEventListener("click", function(e){
	e.preventDefault();
	var newMovie = movieDataBase.addNewMovie();	
});


//Module pattern that holds an array of objects and the functions that are related to them.
//I chose this since I will not be changing these variables or functions
const movieDataBase = (function(){ 
	const movies = [
		{title: "Lord of the rings", year: 2001, genre: ["Adventure", "Drama", "Fantasy"], rating: [10, 8, 8, 9], avrage: 0,time: 178},
		{title: "Return of the king", year: 2003, genre:["Adventure", "Drama", "Fantasy"], rating: [10, 7, 9, 8], avrage: 0, time: 201}, 
		{title: "Empire strikes back", year: 1980, genre: ["Action", "Adventure", "Fantasy"], rating: [8, 7, 4, 7], avrage: 0, time: 124}, 
		{title: "Spirited Away", year: 2001, genre: ["Animation", "Adventure", "Family"], rating: [10, 8, 6, 7], avrage: 0, time: 125}, 
		{title: "The green mile", year: 1999, genre: ["Crime", "Drama", "Fantasy"], rating: [10, 9, 8, 9], avrage: 0, time: 189},
		{title: "the Shining", year: 1980, genre: ["Drama", "Horror"], rating: [10, 6, 8, 5], avrage: 0, time: 146}, 
		{title: "Dracula", year: 1992, genre: ["Fantasy", "Horror"], rating: [6, 8, 5, 4], avrage: 0, time: 128}, 
		{title: "Pledge This!", year: 2006, genre: ["Comedy"], rating: [1, 2, 1, 0], avrage: 0, time: 91 }, 
		{title: "John Wick: Chapter 2", year: 2017, genre: ["Action", "Crime", "Thriller"], rating: [9, 7, 8, 9], avrage: 0, time: 122}, 
		{title: "Passengers", year: 2016, genre: ["Adventure", "Drama", "Romance"], rating: [9, 6, 5, 7], avrage: 0, time: 116}, 
		{title: "The LEGO Batman Movie", year: 2017, genre: ["Animation", "Action", "Adventure"], rating: [4, 5, 7, 6], avrage: 0, time: 104},
	];
	return {//returning the functions
		
		//arrow function that checks which movie object has got the highest avrage number and returning it
		getTopRated: () => {
			movieDataBase.getAvg();//calling the function that adds the numbers in the array
			var topMovie = movies[0];
			for(let i = 0; i < movies.length; i ++){
				if(movies[i].avrage > topMovie.avrage){
					topMovie = movies[i];
				}
			}
			return topMovie;		
		}, 

		//arrow function that checks which movie object has got the lowest avrage number and returning it
		getBottomRated: () => {
			movieDataBase.getAvg();
			var bottomMovie = movies[0];
			for(let i = 0; i < movies.length; i ++){
				if(movies[i].avrage < bottomMovie.avrage){
					bottomMovie = movies[i];
				}
			}
			return bottomMovie;
		}, 

		//arrow function that checks if the movie object year is 2017 and returning it if that is true
		getMoviesThisYear: () => {
			var thisYear = [];
			for(let i = 0; i < movies.length; i++){
				if(movies[i].year === 2017){
					thisYear.push(movies[i]);
			}
			}
			return thisYear;
		},

		//arrow function that will check if the movie object has tha requested genre, from a checkbox in HTML,
		//and if so will return the object that has
		getMovieByGenre: () => {
			var theGenres = [];
			for(let i = 0; i < movieDataBase.movies.length; i++){
				if(movieDataBase.movies[i].genre === genreList.checked){
					theGenres.push(movieDataBase.movies[i]);

				}
			}
			return theGenres;
		},

		//arrow function to add a new movie. Gets the values from the form on HTMLpage and
		//calls the constructor function. Pushes the newly added movie to the array of existing ones
		addNewMovie: () =>{
			var newTitle = elem.newTitle.value;
			var newYear = elem.newYear.value;
			var newGenre = elem.newGenre.value;
			var newRating = elem.newRating.value;
			var newTime = elem.newTime.value;
			var newMovie = new movieDataBase.AddNewMovieConstructor(newTitle, newYear, newGenre, newRating, newTime);
			movies.push(newMovie);
			console.log(movies);
			
		},

		//Constuctor pattern that converts some values to numbers. Is called by the addNewMovie function
		//and takes the arguments from there
		AddNewMovieConstructor: function(title, year, genre, rating, time) {
			this.title = title;
			this.year = parseInt(year);
			this.genre = [genre];
			this.rating = [rating];
			this.time = parseInt(time);
		},

		//arrow function that adds all the numbers in the .rating array in the object in movies.
		//replaces the numbers with the sum of them.
		getAvg: () => {
			for (let i = 0; i < movies.length; i++){
				var top = movies[i].rating.reduce(add, 0);
				function add (a, b){
					return a + b;
				}
				movies[i].avrage = movies[i].avrage + top;
			}		
		},

		//arrow function that loops through the array of objects in movies and displays them.
		showAllMovies: () => {
			var allTheMovies = [];
			for(let i = 0; i < movies.length; i++){
				allTheMovies.push(movies[i]);
			}
			return allTheMovies;
		},

		//arrow function that creates a new HTML element and adds the value (object) and displays it 
		//as text on the HTML page
		showThem: (mov) => {
			var list = document.createElement("li");
			list.innerHTML = "Title: " + mov.title + "<br />" + "Released: " + mov.year +"<br />" + "Genre: " + mov.genre + "<br />" + "Ratings: " + mov.rating +"<br />" + "Length: " + mov.time;
			moviesToShow.appendChild(list);
			var rateThis = document.getElementById("ratingList");
			var addGenre = document.getElementById("addGenre");
			moviesToShow.appendChild(rateThis); //FUNKAR INTE RÄTT
			moviesToShow.appendChild(addGenre);

		}
	};
})();


