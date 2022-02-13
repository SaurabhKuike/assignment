ASSIGNMENT1
Query / Find Documents
query the movies collection to
1. get all documents
~ db.movies.find()
2. get all documents with writer set to "Quentin Tarantino"
~ db.movies.find({writer:'Quentin Tarantino'})
3. get all documents where actors include "Brad Pitt"
~ db.movies.find({actor:'Brad Pitt'})
4. get all documents with franchise set to "The Hobbit"
~ db.movies.find({franchise:'The Hobbit'})
5. get all movies released in the 90s
> db.movies.find({year:{$lt:2000}})
6. get all movies released before the year 2000 or after 2010
~ db.movies.find({year:{$lt:2000 , $gt:2010}})
Update Documents
1. add a synopsis to "The Hobbit: An Unexpected Journey" : "A reluctant hobbit,
Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of
dwarves to reclaim their mountain home - and the gold within it - from the
dragon Smaug."
~db.movies.update({title:'The Hobbit: An Unexpected Journey'},
{title : 'The Hobbit: An Unexpected Journey',
writer : 'J.R.R. Tolkein',
year : 2012,
franchise : 'The Hobbit',
'synopsis':'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of  dwarves to reclaim their mountain home - and the gold within it - from the  dragon Smaug'},
{upsert:true})

2. add a synopsis to "The Hobbit: The Desolation of Smaug" : "The dwarves,
along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim
Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a
mysterious and magical ring."
~db.movies.update({title:'The Hobbit: The Desolation of Smaug'},
{title : 'The Hobbit: The Desolation of Smaug',
writer : 'J.R.R. Tolkein',
year : 2013,
franchise : 'The Hobbit',
'synopsis':'The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim  Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a   mysterious and magical ring '},
{upsert:true})

3. add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
db.movie.update({title:'Pulp Fiction'},
{title : 'Pulp Fiction',
writer : 'Quentin Tarantino',
year : 1994,
actors :'John Travolta,Uma Thurman,Samuel L. Jackson'
},{upsert:true})

Text Search
1. find all movies that have a synopsis that contains the word "Bilbo"
~i)creating text index
~db.movies.createIndex({synopsis:"text"})
~db.movies.find({$text:{$search:"bilbo"}})

2. find all movies that have a synopsis that contains the word "Gandalf"
~db.movies.find({$text:{$search:"Gandalf"}})
3.find all movies that have a synopsis that contains the word "Bilbo" and not the
word "Gandalf"
~db.movies.find({$and: [{synopsis: /.Bilbo./}, {synopsis: /.^Gandalf./}]})
4. find all movies that have a synopsis that contains the word "dwarves" or
"hobbit"
~db.movies.find({$and: [{synopsis: /Bilbo/}, {synopsis: {$not: /Gandalf/}}]})
5. find all movies that have a synopsis that contains the word "gold" and
"dragon"
~db.movies.find({$or: [{synopsis: /dwarves/}, {synopsis: /hobbit/}]})






Delete Documents

1.  delete the movie "Pee Wee Herman's Big Adventure"
 ~db.movies.remove({title:"Pee Wee Herman's Big Adventure"});

2.  delete the movie "Avatar"
 ~db.movies.remove({title:"Avatar"});

Querying related collections

 1. find all users
~  db.users.find().pretty();

 2. find all posts
~  db.posts.find().pretty();


 3. find all posts that was authored by "GoodGuyGreg"
~  db.posts.find({username:"GoodGuyGreg"}).pretty()


 4. find all posts that was authored by "ScumbagSteve"
~  db.posts.find({username:"ScumbagSteve"}).pretty()


 5. find all comments
~  db.comments.find().pretty();

 6. find all comments that was authored by "GoodGuyGreg"
~  db.comments.find({username:"GoodGuyGreg"}).pretty()

 7. find all comments that was authored by "ScumbagSteve"
~  db.comments.find({username:"ScumbagSteve"}).pretty()
  8. find all comments belonging to the post "Reports a bug in your code"
~  db.comments.find({post: db.posts.findOne({title: "Reports a bug in your code"})._id})

ASSIGNMENT2
Atlanta Population
1. use db.zipcodes.find() to filter results to only the results where city is ATLANTA
and state is GA.
~db.zipcodes.find({city:'ATLANTA',state:'GA'})
2. use db.zipcodes.aggregate with $match to do the same as above.
~db.zipcodes.aggregate([{$match:{city:{$in:['ATLANTA','GA']}}}])
3. use $group to count the number of zip codes in Atlanta.

4. use $group to find the total population in Atlanta
~db.zipcodes.aggregate([{$match:{city:'ATLANTA'}},{$group:{_id:"$city",total:{$sum:"$pop"}}}])

Populations By State
1. use aggregate to calculate the total population for each state
~db.zipcodes.aggregate([{$match:{}},{$group:{_id:"$city",total:{$sum:"$pop"}}}])
2. sort the results by population, highest first
db.zipcodes.aggregate([{$match:{}},{$group:{_id:"$city",total:{$sum:"$pop"}}},{$sort:{total:-1}}])
3. limit the results to just the first 3 results. What are the top 3 states in
population?
~population1> db.zipcodes.aggregate({$limit:3})

Populations by City
1. use aggregate to calculate the total population for each city (you have to use
city/state combination). You can use a combination for the _id of the $group: {
city: '$city', state: '$state' }
2. sort the results by population, highest first
3. limit the results to just the first 3 results. What are the top 3 cities in
population?
4. What are the top 3 cities in population in Texas?
~for first three(1,2,3) querys
db.zipcodes.aggregate([{$group:{_id:{city:"$city",state:"$state"},population:{$sum:"$pop"}}},{$sort:{"population":-1}},{$limit: 3}])



Bonus
1. Write a query to get the average city population for each state.
db.zipcodes.aggregate([{$group:{_id:{city:"$city"},AvgPopulation:{$avg:"$pop"}}}])
2. What are the top 3 states in terms of average city population
db.zipcodes.aggregate([{$group:{_id:{city:"$city"},AvgPopulation:{$avg:"$pop"}}},{$sort:{"AvgPopulation":-1}},{$limit:3}])


ASSIGNMENT3
. Write a MongoDB query to display all the documents in the collection
restaurants.
~db.addresses.find()
2. Write a MongoDB query to display the fields restaurant_id, name, borough
and cuisine for all the documents in the collection restaurant
~db.addresses.find({},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1})

3. Write a MongoDB query to display the fields restaurant_id, name, borough
and cuisine, but exclude the field _id for all the documents in the collection
restaurant.
~db.addresses.find({},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1,"_id":0})
4. Write a MongoDB query to display the fields restaurant_id, name, borough
and zip code, but exclude the field _id for all the documents in the collection
restaurant.
~db.addresses.find({},{"restaurant_id" : 1,"name":1,"borough":1,"address.zipcode" :1,"_id":0})
5. Write a MongoDB query to display the first 5 restaurant which is in the
borough Bronx.

db.addresses.find({"borough": "Bronx"}).limit(5)
6. Write a MongoDB query to display all the restaurant which is in the borough
Bronx.

db.addresses.find({"borough": "Bronx"})

7. Write a MongoDB query to display the next 5 restaurants after skipping first 5
which are in the borough Bronx.
db.restaurants.find({"borough": "Bronx"}).skip(5).limit(5)

8. Write a MongoDB query to find the restaurants who achieved a score more
than 90.
db.restaurants.find({grades : { $elemMatch:{"score":{$gt : 90}}}})

9. Write a MongoDB query to find the restaurants that achieved a score, more
than 80 but less than 100.
db.restaurants.find({grades : { $elemMatch:{"score":{$gt : 80 , $lt :100}}}})

10. Write a MongoDB query to find the restaurants which locate in latitude value
less than -95.754168.
db.restaurants.find({"address.coord" : {$lt : -95.754168}})

11. Write a MongoDB query to find the restaurants that do not prepare any
cuisine of 'American' and their grade score more than 70 and latitude less
than -65.754168.

db.restaurants.find({$and:  [{"cuisine" : {$ne :"American "}}, {"grades.score" : {$gt : 70}}, {"address.coord" : {$lt : -65.754168}}         ]  });

12. Write a MongoDB query to find the restaurants which do not prepare any
cuisine of 'American' and achieved a score more than 70 and located in the
longitude less than -65.754168.
db.restaurants.find( {   "cuisine" : {$ne : "American "},   "grades.score" :{$gt: 70},   "address.coord" : {$lt : -65.754168}  })


13. Write a MongoDB query to find the restaurants which do not prepare any
cuisine of 'American ' and achieved a grade point 'A' not belongs to the
borough Brooklyn. The document must be displayed according to the cuisine
in descending order.
db.restaurants.find( {"cuisine" : {$ne : "American "},"grades.grade" :"A","borough": {$ne : "Brooklyn"}   }   ).sort({"cuisine":-1})


14. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
for those restaurants which contain 'Wil' as first three letters for its name.
db.restaurants.find({name: /^Wil/},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1})


15. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
for those restaurants which contain 'ces' as last three letters for its name.
db.restaurants.find({name: /ces$/},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1})


16. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
for those restaurants which contain 'Reg' as three letters somewhere in its
name.
db.restaurants.find({"name": /.*Reg.*/},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1})

17. Write a MongoDB query to find the restaurants which belong to the borough
Bronx and prepared either American or Chinese dish.
db.restaurants.find({ "borough": "Bronx" , $or : [{ "cuisine" : "American " },{ "cuisine" : "Chinese" }] } )

18. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
for those restaurants which belong to the borough Staten Island or Queens or
Bronxor Brooklyn.
db.restaurants.find({"borough" :{$in :["Staten Island","Queens","Bronx","Brooklyn"]}},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1})

19. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
for those restaurants which are not belonging to the borough Staten Island or
Queens or Bronxor Brooklyn.
db.restaurants.find({"borough" :{$nin :["Staten Island","Queens","Bronx","Brooklyn"]}},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1})

20. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
for those restaurants which achieved a score which is not more than 10.
db.restaurants.find({"grades.score" : { $not: {$gt : 10}}},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1})

21. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
for those restaurants which prepared dish except 'American' and 'Chinees' or
restaurant's name begins with letter 'Wil'.
db.restaurants.find({$or: [{name: /^Wil/}, {"$and": [{"cuisine" : {$ne :"American "}},  {"cuisine" : {$ne :"Chinees"}}]}]},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1}


22. Write a MongoDB query to find the restaurant Id, name, and grades for those
restaurants which achieved a grade of "A" and scored 11 on an ISODate

db.addresses.find(   { "grades.date": ISODate("2014-08-11T00:00:00Z"), "grades.grade":"A" , "grades.score" : 11  },   {"restaurant_id" : 1,"name":1,"grades":1})

23. Write a MongoDB query to find the restaurant Id, name and grades for those
restaurants where the 2nd element of grades array contains a grade of "A"

db.restaurants.find(   { "grades.1.date": ISODate("2014-08-11T00:00:00Z"), "grades.1.grade":"A" , "grades.1.score" : 9}, {"restaurant_id" : 1,"name":1,"grades":1}   )

24. Write a MongoDB query to find the restaurant Id, name, address and
geographical location for those restaurants where 2nd element of coord array
contains a value which is more than 42 and upto 52..
order along with all the columns.
db.restaurants.find( {   "address.coord.1": {$gt : 42, $lte : 52}  },{"restaurant_id" : 1,"name":1,"address":1,"coord":1})

26. Write a MongoDB query to arrange the name of the restaurants in descending
along with all the columns.
db.restaurants.find().sort({"name":1})

27. Write a MongoDB query to arranged the name of the cuisine in ascending
order and for that same cuisine borough should be in descending order.

db.restaurants.find().sort(   {"cuisine":1,"borough" : -1,})

28. Write a MongoDB query to know whether all the addresses contains the street
or not.

db.restaurants.find({"address.street" :{ $exists : true }})

29. Write a MongoDB query which will select all documents in the restaurants
collection where the coord field value is Double.

db.restaurants.find({"address.coord" : {$type : 1}})

30. Write a MongoDB query which will select the restaurant Id, name and grades
for those restaurants which returns 0 as a remainder after dividing the score
by 7.
db.restaurants.find({"grades.score" :{$mod : [7,0]}},{"restaurant_id" : 1,"name":1,"grades":1}  )



31. Write a MongoDB query to find the restaurant name, borough, longitude and
attitude and cuisine for those restaurants which contains 'mon' as three letters
somewhere in its name.

db.restaurants.find( { name :  { $regex : "mon.*", $options: "i" }}, { "name":1, "borough":1, "address.coord":1,"cuisine" :1  }   )
32. Write a MongoDB query to find the restaurant name, borough, longitude and
latitude and cuisine for those restaurants which contain 'Mad' as first three
letters of its name.
db.restaurants.find( { name : { $regex : /^Mad/i, }  }, {"name":1,   "borough":1, "address.coord":1, "cuisine" :1  }   )
