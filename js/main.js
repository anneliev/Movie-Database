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
	newCover: document.getElementById("newCover"),
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

//Module pattern using IIFE with event listeners on the buttons on HTML page. Calling functions when clicked on
const elemButtons = (function(){
	elem.showAllMoviesButton.addEventListener("click", function(){
		let allTheMovies = movieDataBase.showAllMovies();//creating a variable that calls a function. the variable is later returned with a value
		movieDataBase.displayTheMovies(allTheMovies);//calling the function that shows the values on the HTML page,
		//with the returned variable as an argument	
	});

	elem.topRatedButton.addEventListener("click", function(){
		let topMovie = movieDataBase.getTopRated();
		movieDataBase.displayTheMovies(topMovie); 
	});

	elem.bottomRatedButton.addEventListener("click", function(){
		let bottomMovie = movieDataBase.getBottomRated();
		movieDataBase.displayTheMovies(bottomMovie);
	});

	elem.thisYearButton.addEventListener("click", function(){
		let thisYear = movieDataBase.getMoviesThisYear();
		movieDataBase.displayTheMovies(thisYear);
	});

	elem.byGenreButton.addEventListener("click", function(e){
		e.preventDefault();//function that prevents the page from refreshing when using a form
		let theGenres = movieDataBase.getMoviesByGenre();
		movieDataBase.displayTheMovies(theGenres);
		
	});

	elem.addMovieButton.addEventListener("click", function(e){
		e.preventDefault();
		let newMovie = movieDataBase.addNewMovie();	
		movieDataBase.displayTheMovies(newMovie);
	});

	elem.editButton.addEventListener("click", function(){
		let editedMovie = movieDataBase.editMovie();
		movieDataBase.displayTheMovies(editedMovie);
	});
});
elemButtons();//calling the function holding the buttons

//Module pattern that holds an array of objects and the functions that are related to them.
//I chose this since I will not be changing these variables or functions
const movieDataBase = (function(){ //using const since this variables will not be changed
	const movies = [//The array of objects with properties of url, string, array and number.
		{	
			cover: "http://images.moviepostershop.com/lord-of-the-rings-1-the-fellowship-of-the-ring-movie-poster-1000186895.jpg",
			title: "The Lord of the Rings", 
			year: 2001, 
			genre: ["Adventure", "Drama", "Fantasy"], 
			rating: [10, 8, 8, 9], 
			avrage: [0],
			time: 178
		},
		{
			cover: "http://images.moviepostershop.com/lord-of-the-rings-the-return-of-the-king-movie-poster-1000189230.jpg", 
			title: "The Return of the King", 
			year: 2003, 
			genre:["Adventure", "Drama", "Fantasy"], 
			rating: [10, 7, 9, 8], 
			avrage: [0], 
			time: 201
		}, 
		{
			cover: "http://img.moviepostershop.com//the-empire-strikes-back-movie-poster-1980-1010189518.jpg",
			title: "The Empire Strikes Back", 
			year: 1980, 
			genre: ["Action", "Adventure", "Fantasy"], 
			rating: [8, 7, 4, 7], 
			avrage: [0], 
			time: 124
		}, 
		{
			cover: "http://images.moviepostershop.com/spirited-away-movie-poster-1000407964.jpg",
			title: "Spirited Away", 
			year: 2001, 
			genre: ["Animation", "Adventure", "Family"], 
			rating: [10, 6, 7], 
			avrage: [0], 
			time: 125
		}, 
		{
			cover: "http://images.moviepostershop.com/the-green-mile-movie-poster-1000297811.jpg",
			title: "The Green Mile", 
			year: 1999, 
			genre: ["Crime", "Drama", "Fantasy"], 
			rating: [10, 9, 8, 9], 
			avrage: [0], 
			time: 189
		},
		{
			cover: "http://images.moviepostershop.com/the-shining-movie-poster-1000189607.jpg",
			title: "The Shining", 
			year: 1980, 
			genre: ["Drama", "Horror"], 
			rating: [10, 6, 8, 5, 4], 
			avrage: [0], 
			time: 146
		}, 
		{
			cover: "http://images.moviepostershop.com/bram-stokers-dracula-movie-poster-1000190922.jpg",
			title: "Bram Stoker's Dracula", 
			year: 1992, 
			genre: ["Fantasy", "Horror"], 
			rating: [6, 8, 5, 4, 3], 
			avrage: [0], 
			time: 128
		}, 
		{
			cover: "http://img.moviepostershop.com/pledge-this-movie-poster-2006-1010402301.jpg",
			title: "Pledge This!", 
			year: 2006, 
			genre: ["Comedy"], 
			rating: [1, 2, 1, 0], 
			avrage: [0], 
			time: 91 
		}, 
		{
			cover: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
			title: "John Wick: Chapter 2", 
			year: 2017, 
			genre: ["Action", "Crime", "Thriller"], 
			rating: [9, 7, 8, 9], 
			avrage: [0], 
			time: 122
		}, 
		{
			cover: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4MjU3MDIzOF5BMl5BanBnXkFtZTgwMjM2MzY2MDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
			title: "Passengers", 
			year: 2016, 
			genre: ["Adventure", "Drama", "Romance"], 
			rating: [9, 6, 5, 7], 
			avrage: [0], 
			time: 116
		}, 
		{
			cover: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
			title: "The LEGO Batman Movie", 
			year: 2017, 
			genre: ["Animation", "Action", "Adventure"], 
			rating: [4, 5, 7, 6], 
			avrage: [0], 
			time: 104
		}
	];

	//returning the functions
	return {
		
		//arrow function that loops through the array of objects in movies, pushes them into the new created array and returns that.
			showAllMovies: () => {
			let allTheMovies = [];
			for(let i = 0; i < movies.length; i++){
				allTheMovies.push(movies[i]);
			}
			return allTheMovies;
		},

		//arrow function that checks which movie object has got the highest avrage number and returning it,
		//by first calling the function getAvg to get the avrage number of rating property in movies. 
		//sorts the movie objects after the number in avrage, highest to lowest. Returns an array.
		getTopRated: () => {
			movieDataBase.getAvg();//calling the function that calculates the avrage rating
			movies.sort(function(a, b){
				return b.avrage - a.avrage;
			});
			topMovie = movies;
			return topMovie;
		}, 

		//arrow function that checks which movie object has got the lowest avrage number and returning it,
		//by first calling the function getAvg to get the avrage number of rating property in movies. 
		//sorts the movie objects after the number in avrage, lowest to highest. Returns an array.
		getBottomRated: () => {
			movieDataBase.getAvg();
			movies.sort(function(a, b){
				return a.avrage - b.avrage;
			});
			bottomMovie = movies;
			return bottomMovie;
		},
		

		//arrow function that checks if the year property of movie object is 2017. If so, pushes that movie object
		//into the new created array (thisYear) and returns it.
		getMoviesThisYear: () => {
			let thisYear = [];
			for(let i = 0; i < movies.length; i++){
				if(movies[i].year === 2017){
					thisYear.push(movies[i]);
				}
			}
			return thisYear;
		},

		//arrow function that checks if the movie object has the requested genre, by using the
		//Array.prototype.contains() function. The value is from checkboxes in HTML.
		//If the value is included in the genre array, that movie object will be pushed intothe new created array (theGenres), 
		//which is returned.
		getMoviesByGenre: () => {
			let theGenres = [];
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
		//calls the constructor function. Pushes the newly added movie to the array of existing ones (movieDatabase movies)
		addNewMovie: () =>{
			let newCover = elem.newCover.value;
			if(newCover === ""){//if the user doesn't specify an url to a cover, a default imgae is added
				newCover = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
			}
			let newTitle = elem.newTitle.value;
			let newYear = elem.newYear.value;
			let newGenre = elem.newGenre.value;
			let newRating = elem.newRating.value;
			let newAvrage = 0;
			let newTime = elem.newTime.value;
			if(newTitle === ""){//if the input field for Title is empty, no new movie will be added. 
								//Instead an alert will pop up telling the user to add a title
				alert("You need to enter a title");
			}else{//if a title is entered, a new movie can be added to the database
				let newMovie = new movieDataBase.Movie(newCover, newTitle, newYear, newGenre, newRating, newAvrage, newTime);
				movies.push(newMovie);
				elem.newMovieForm.reset();//function that resets the whole form after the new movie is added to the movie array
				return newMovie;	
			}		
		},

		//Constuctor pattern that is used to create a new movies object. It converts some values to numbers and others to arrays.
		// Is called by the addNewMovie function and gets the arguments from there
		Movie: function(cover, title, year, genre, rating, avrage, time) {
			this.cover = cover;
			this.title = title;
			this.year = parseInt(year);
			this.genre = [genre];
			this.rating = [rating];
			this.avrage = [rating];
			this.time = parseInt(time);
		},

		//Arrow function that checks if a movie is selected from a select form. If so checks if there is
		//a new value in input fields and another select form. Returns the edited movie.
		editMovie: () => {
			let editedMovie = [];
			let selectedMovie = elem.movieToEdit.value;
			let addRating = parseInt(elem.addedRating.value);
			let valid = !isNaN(addRating);//Bool that is used to check if the value in an input field is a number or not
			let addGenre = elem.addedGenre.value;
			let removeGenre = elem.removedGenre.value;
			
			for(let i = 0; i < movies.length; i++){
				if(selectedMovie === movies[i].title){
					editedMovie = movies[i];
					if(valid){//if value is a number, the new rating can be pushed into the rating array of the selected movie
						if(addRating > 10){//if the entered number is higher than 10 an alert will pop up and no rating will be added
							alert("The highest rating for a movie is 10. Your rating was not added");
						}else{//if the entered number isn't higher than 10 it will be pushed into the rating array of the selevted movie
						editedMovie.rating.push(addRating);
						}
					}
					if(addGenre !== ""){//if input field isn't empty, the new genre will be pushed into the genre array of the selected movie
						editedMovie.genre.push(addGenre);
					}
					let currentMovieGenre = editedMovie.genre;
					Array.prototype.contains = function(g){
						return this.indexOf(g) > -1;
					};
					if(currentMovieGenre.contains(removeGenre)){//function that checks if the selected movie genre array contains the chosen genre
																//using the above Array.prototype.contains function 
						for(let i = 0; i < currentMovieGenre.length; i++){
							if(currentMovieGenre[i] === removeGenre){//if the selected genre exist in the selected movie, it will be removed from the genre array in the selected movie
								currentMovieGenre.splice(i, 1);
							}
						}
					}
				}
			}
			movieToEdit.selectedIndex = 0;//resets the select form for the chosen movie
			addedRating.value = "";//resets the input field for rating
			addedGenre.value = "";//resets the input field for added genre
			removedGenre.selectedIndex = 0;//restes the select form for genre to remove
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
			let moviesToShow = elem.moviesToShow;
			moviesToShow.innerHTML = "";
			for(let i = 0; i < mov.length; i++){
				let theMovies = `<li class="movieDisplay">
				<img src="${mov[i].cover}"></img>
				<p><strong>${mov[i].title}</strong></p>
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


