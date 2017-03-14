# Movie Database

By Annelie Viklund
Front-end developer student at Nackademin
https://github.com/anneliev/Movie-Database


Assignment for Javascript course in school. A local movie database with basic features.

  - Display movies based on rating, genre or year
  - Add a movie
  - Edit a movie - Add rating, add genre, remove genre

I have written the code using ES6/ES2015 and I have used three different namespaces.

1. The first one is a Object literal for the variables storing the elements I get from the index.HTML by using document.getElementById/ClassName.

2. The second one is a Moduele pattern with a IIFE. This holds all the eventlisteners for the buttons on index.HTML. When clicked the button calls a function and gets a varible back. That variable is used as a argument when calling a second function. I my opinion Module patterns is easier to use and read than Reveling module pattern. 

3. The third namespace is also a Module pattern which includes the array holding all movie objects as well as all the functions. I have made many small functions that has a clear purpose. For the constructor a used the Constuctor pattern, mostly since that is the one I am used to and I think that it looks clean. For arrays I have used the functions .lenght, .sort, .push, .splice, .pop and Array.prototype.contains. 
In the functions to display the movies on the HTML page i used template literals, since it's very convinient when mixing strings and vaiables, and it makes the code look cleaner. 
