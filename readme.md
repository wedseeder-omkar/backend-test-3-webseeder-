// API Documentation 
Base_url in this case is (localhost:3000)

postman testing as well as api working 

/Get : Base_url/users
    Description:- "get all the user"
    header :- appliaction/json 
    eg :-  { "object.id"  : "68c3ecb0c3e7ddb21cac194f" , "username" : "omkar"  }

/post : Base_url/users 
    Description:- " create a new user on the db "
    header:- appliaction/json 
    post:- { "username" : "omkar" }
    res:-  { "object.id"  : "68c3ecb0c3e7ddb21cac194f" , "username" : "omkar"  }

/post : Base_url/message/
    eg.url:- localhost:3000/messages/68c3ecb0c3e7ddb21cac194f/68c3e14159a070d23d33986c
    Description:- "send the text from user_1 to user_2" 
    header:- appliaction/json
    post:- { "sender": "68c3ecb0c3e7ddb21cac194f", "receiver": "68c3e14159a070d23d33986c", "text": "Hello, how are you?" }

/Get : Base_url/message/user_1/User_2
    eg.url:- localhost:3000/messages/68c3ecb0c3e7ddb21cac194f/68c3e14159a070d23d33986c
    Description:- "get all the message betweemn user1 and user2 " 
    header:- appliaction/json
    eg:- { "sender": "68c3ecb0c3e7ddb21cac194f", "receiver": "68c3e14159a070d23d33986c", "text": "Hello, how are you?" }

// Npm dependencies 
 
    Express:- for routing and middleware 
    http:- for http request and websocket upgradtion
    socket.io:- for make open connection between server and cilent 
    cors:- for cross talk between ports 
    Dotenv:- to config the sensitive data as gobal variable
    mongoose:- to connect to mongodb atlas 

// how to start the server 

    1.config the variable in .env file 
        touch .env  -> MONGO_URI="Put your url here -> port="according to your refernece" || default 3000
    
    2.Install all the package by using 
        npm init -> nose server 

    3.(perferred)test the api with postman as shown in above 

    4.(optinal) start the index.html from fontend 

//clear up script if needed 

    rm -rf node_moducles 
    rm -rf .git 
    then delete all the file. 

Project done by omkar.
