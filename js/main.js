//storing HTML elements using Object literal to be albe to call them and to have them in the same namespace
const elem = {
	moviesToShow: document.getElementById("moviesToShow"),
	showAllMoviesButton: document.getElementById("showAllMoviesButton"),
	topRatedButton: document.getElementById("topRatedButton"),
	bottomRatedButton: document.getElementById("bottomRatedButton"),
	thisYearButton: document.getElementById("thisYearButton"),
	byGenreButton: document.getElementById("byGenreButton"),
	genreList: document.getElementById("genreList"),
	addMovieButton: document.getElementById("addMovieButton"),
	newMovieForm: document.getElementById("newMovieForm"),
	newTitle: document.getElementById("newTitle"),
	newYear: document.getElementById("newYear"),
	newGenre: document.getElementById("newGenre"),
	newRating: document.getElementById("newRating"),
	newTime: document.getElementById("newTime"),
	movieEditor: document.getElementsByClassName("movieEditor"),
	movieToEdit: document.getElementById("movieToEdit"),
	addedRating: document.getElementById("addedRating"),
	addedGenre: document.getElementById("addedGenre"),
	removedGenre: document.getElementById("removedGenre"),
	editButton: document.getElementById("editButton")
};

//Module pattern with event listeners on the buttons on HTML page. Calling functions when clicked on
const elemButtons = (function(){
	elem.showAllMoviesButton.addEventListener("click", function(){
		var allTheMovies = movieDataBase.showAllMovies();//creating a variable that calls a function. the variable is later returned with a value
		movieDataBase.displayTheMovies(allTheMovies);//calling the function that shows the values on the HTML page,
		//with the created variable as an argument	
	});

	elem.topRatedButton.addEventListener("click", function(){
		var topMovie = movieDataBase.getTopRated();
		movieDataBase.displayTheMovies(topMovie); 
	});

	elem.bottomRatedButton.addEventListener("click", function(){
		var bottomMovie = movieDataBase.getBottomRated();
		movieDataBase.displayTheMovies(bottomMovie);
	});

	elem.thisYearButton.addEventListener("click", function(){
		var thisYear = movieDataBase.getMoviesThisYear();
		movieDataBase.displayTheMovies(thisYear);
	});

	elem.byGenreButton.addEventListener("click", function(e){
		e.preventDefault();
		var theGenres = movieDataBase.getMoviesByGenre();
		movieDataBase.displayTheMovies(theGenres);
		
	});

	elem.addMovieButton.addEventListener("click", function(e){
		e.preventDefault();
		var newMovie = movieDataBase.addNewMovie();	
		movieDataBase.displayTheMovies(newMovie);
	});

	elem.editButton.addEventListener("click", function(){
		var editedMovie = movieDataBase.editMovie();
		movieDataBase.displayTheMovies(editedMovie);
	});
});
elemButtons();//calling the function holding the buttons

//Module pattern that holds an array of objects and the functions that are related to them.
//I chose this since I will not be changing these variables or functions
const movieDataBase = (function(){ 
	const movies = [
		{title: "The Lord of the Rings", year: 2001, genre: ["Adventure", "Drama", "Fantasy"], rating: [10, 8, 8, 9], avrage: [0],time: 178},
		{title: "The Return of the King", year: 2003, genre:["Adventure", "Drama", "Fantasy"], rating: [10, 7, 9, 8], avrage: [0], time: 201}, 
		{title: "Empire Strikes Back", year: 1980, genre: ["Action", "Adventure", "Fantasy"], rating: [8, 7, 4, 7], avrage: [0], time: 124}, 
		{title: "Spirited Away", year: 2001, genre: ["Animation", "Adventure", "Family"], rating: [10, 6, 7], avrage: [0], time: 125}, 
		{title: "The Green Mile", year: 1999, genre: ["Crime", "Drama", "Fantasy"], rating: [10, 9, 8, 9], avrage: [0], time: 189},
		{title: "The Shining", year: 1980, genre: ["Drama", "Horror"], rating: [10, 6, 8, 5, 4], avrage: [0], time: 146}, 
		{title: "Dracula", year: 1992, genre: ["Fantasy", "Horror"], rating: [6, 8, 5, 4, 3], avrage: [0], time: 128}, 
		{title: "Pledge This!", year: 2006, genre: ["Comedy"], rating: [1, 2, 1, 0], avrage: [0], time: 91 }, 
		{title: "John Wick: Chapter 2", year: 2017, genre: ["Action", "Crime", "Thriller"], rating: [9, 7, 8, 9], avrage: [0], time: 122}, 
		{title: "Passengers", year: 2016, genre: ["Adventure", "Drama", "Romance"], rating: [9, 6, 5, 7], avrage: [0], time: 116}, 
		{title: "The LEGO Batman Movie", year: 2017, genre: ["Animation", "Action", "Adventure"], rating: [4, 5, 7, 6], avrage: [0], time: 104},
	];

	//returning the functions
	return {
		
		//arrow function that loops through the array of objects in movies and displays them.
		showAllMovies: () => {
			var allTheMovies = [];
			for(let i = 0; i < movies.length; i++){
				allTheMovies.push(movies[i]);
			}
			return allTheMovies;
		},

		//arrow function that checks which movie object has got the highest avrage number and returning it
		getTopRated: () => {
			movieDataBase.getAvg();//calling the function that adds the numbers in the array
			movies.sort(function(a, b){
				return b.avrage - a.avrage;
			});
			topMovie = movies;
			return topMovie;
		}, 

		//arrow function that checks which movie object has got the lowest avrage number and returning it
		getBottomRated: () => {
			movieDataBase.getAvg();
			movies.sort(function(a, b){
				return a.avrage - b.avrage;
			});
			bottomMovie = movies;
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

		//arrow function that checks if the movie object has tha requested genre, by using the
		//Array.prototype.includes() function. The value is from checkboxes in HTML.
		//If so will push that movie into the created array, which is returned and dispalyed.
		getMoviesByGenre: () => {
			var theGenres = [];
			let checkedGenre = document.getElementById("genreList");
			for(let i = 0; i  < movies.length; i++){
				for(let j = 0; j < checkedGenre.length; j++){
					if(checkedGenre[j].checked){
						let currentMovieGenre = movies[i].genre;
						let chosenGenre = checkedGenre[j].value;
						Array.prototype.contains = function(v){
							return this.indexOf(v) > -1;
						};
						if(currentMovieGenre.contains(chosenGenre)){
							theGenres.push(movies[i]);
						}
					}
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
			var newAvrage = 0;
			var newTime = elem.newTime.value;
			var newMovie = new movieDataBase.Movie(newTitle, newYear, newGenre, newRating, newAvrage, newTime);
			movies.push(newMovie);
			elem.newMovieForm.reset();
			return newMovie;			
		},

		//Constuctor pattern that converts some values to numbers. Is called by the addNewMovie function
		//and takes the arguments from there
		Movie: function(title, year, genre, rating, avrage, time) {
			this.title = title;
			this.year = parseInt(year);
			this.genre = [genre];
			this.rating = [rating];
			this.avrage = [rating];
			this.time = parseInt(time);
		},

		//Arrow function that checks if a movie is selected from a select form. If so checks if there is
		//a new value in inout fields and another select form. Returns the edited movie.
		editMovie: () => {
			var editedMovie = [];
			let selectedMovie = elem.movieToEdit.value;
			let addRating = parseInt(elem.addedRating.value);
			let valid = !isNaN(addRating);//Bool that is used to check if the value in an input field is a number or not
			let addGenre = elem.addedGenre.value;
			let removeGenre = elem.removedGenre.value;
			
			for(let i = 0; i < movies.length; i++){
				if(selectedMovie === movies[i].title){
					editedMovie = movies[i];
					if(valid){//if value is a number, the new rating will be pushed into the rating array of movies
						editedMovie.rating.push(addRating);
					}if(addGenre !== ""){//if field isn't empty, the new genre will be pushed into the genre array of movies
						editedMovie.genre.push(addGenre);
					}
					let currentMovieGenre = editedMovie.genre;
					Array.prototype.contains = function(v){
						return this.indexOf(v) > -1;
					};
					if(currentMovieGenre.contains(removeGenre)){//if the selected genre exist in the selected movie, it will be spliced out of the genre array in movies
						for(let i = 0; i < currentMovieGenre.length; i++){
							if(currentMovieGenre[i] === removeGenre){
								currentMovieGenre.splice(i, 1);
							}
						}
					}
				}
			}
			return editedMovie;
		},

		//arrow function that adds all the numbers in the .rating array in the object in movies
		//and divides them with the length of the .rating array.
		//replaces the numbers with the avrage of them.
		getAvg: () => {
			for (let i = 0; i < movies.length; i++){
				let top = movies[i].rating.reduce(add, 0);
				function add (a, b){
					return a + b;
				}
				movies[i].avrage.pop();
				top = parseFloat(top/movies[i].rating.length).toFixed(1);//rounding the number to have one decimal
				movies[i].avrage.push(movies[i].avrage + top);
			}		
		},

		//arrow function that creates a new HTML element and adds the value (object) and displays it 
		//as text on the HTML page
		displayTheMovies: (mov) => {
			movieDataBase.getAvg();
			var moviesToShow = elem.moviesToShow;
			moviesToShow.innerHTML = "";
			for(let i = 0; i < mov.length; i++){
				let theMovies = `<li class="movieDisplay">
				<p><strong>Title: ${mov[i].title}</strong></p>
				<p>Released: ${mov[i].year}</p>
				<p>Genre: ${mov[i].genre}</p>
				<p>Rating: ${mov[i].avrage}</p>
				<p>Length: ${mov[i].time} minutes</p>
				</li>`;
				moviesToShow.innerHTML += theMovies;
			}
		}
	};
})();


