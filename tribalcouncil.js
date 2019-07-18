
//Initializing Firebase
  var config = {
    apiKey: "AIzaSyBYFOuocBhI3ZMa34HTQQ3OG5iDfItdSS4",
    authDomain: "mywebapp-7bc86.firebaseapp.com",
    databaseURL: "https://mywebapp-7bc86.firebaseio.com",
    projectId: "mywebapp-7bc86",
    storageBucket: "mywebapp-7bc86.appspot.com",
    messagingSenderId: "858961654254"
  };
  firebase.initializeApp(config);

var firestore = firebase.firestore();

//Reference to Room
const docRef1 = firestore.collection("Room1");

//Reference to Page Number
const docRefR = firestore.collection("PageNumber").doc("CurrentPage");

//==========================HTMLTEXTS/BUTTONS=================//
//Output room# and Input room#
const roomNumberShown = document.querySelector("#roomNumberShown");
const roomID = document.querySelector("#roomID");

//Output playerName and Input playerName
const playerNameShown = document.querySelector("#nicknameOutput");
const playerName = document.querySelector("#playerName");


//Join Room Button
const joinRoomButton = document.getElementById("joinRoom");

//Response Text Field
const response = document.getElementById("response");

//Player Score Number
const score = document.getElementById("score");

// SMART TO SAVE EACH PLAYERS DATA GLOBALLY AND RE-ACCESS IT
// BETTER THAN COOKIES FOR SURE

//ROOM SIZE
var roomSize = 0;

//USERS PLAYERNAME
var localPlayerName;

//USERS PLAYERNUMBER
var localPlayerNumber;

//USERS SCORE

//USERS ROOM


// VARIABLE CURRENT PAGE = 0, then after they enter increment

// WHERE FUNCTIONS ARE CALLED in order...
setupQuestion();

//=========================BUTTON CLICKS===================//
//JOIN ROOM BUTTON CLICK
//First - save the room# input and playerName input to firestore
//Second - put the room# and playerName at the top of the screen
//Third - erase the unneeded text field and buttons
//Fourth - call the changeQuestion function
//         ...this function gets a question from the database and displays it
//          ...this function also unblocks a text entry and button to collect responses
joinRoom.addEventListener("click", function(){
    const roomToSave = roomID.value;
    const playerToSave = playerName.value;
    console.log("I am going to save " + roomToSave + " and " + playerToSave + " to Firestore");

    // GIVE THE PLAYERS NUMBERS IN ORDER OF WHEN THEY JOINED GAME HERE
    
    //if()
//     firestore.collection("Room1").get().then(res => {
//        
//            console.log("firt room size print is " + res.size);
//         
//            roomSize = res.size;
//         console.log("room size = " + roomSize);
//            });
    // Should call check room size in update probably
    

    localPlayerNumber = roomSize;


    docRef1.doc(playerToSave).set({
        playerName: playerToSave,
        playerNumber: roomToSave,
        roomNumber: "1",
        score: 0.0
    }).then(function(){
        //SAVE THE COOKIE!!!
        //create a cookie
        //document.cookie = playerToSave;
        
        localPlayerName = playerToSave;
        
        document.cookie = "playerName" + "=" + playerToSave + ";"

        document.cookie = "playerNumber" + "=" + roomToSave + ";"

        console.log("Document written with Room ID: ", docRef1.id);
        playerNameShown.innerHTML = "Name: " + playerToSave;
        roomNumberShown.innerHTML = "Room #: 1";

        //need to change the way the page looks!
        playerNameShown.style.fontSize = "12px";

        //hiding playername entry
        playerName.style.display = "none";

        roomNumberShown.style.fontSize = "12px";
        //hiding room entry
        roomID.style.display = "none";

        //adding scoreboard
        score.style.fontSize = "12px";
        score.style.display = "block";
        score.innerText = "Score: 0";

        joinRoomButton.style.display = "none";

        var q = document.getElementById("questionOutput");
        q.style.display = "block";


         //CHANGING PAGE NUMBER IF LAST PLAYER Joins
            firestore.collection("Room1").get().then(res => {
            console.log(res.size);
            if(res.size ==  "5"){
                 docRefR.set({
                        pageNumber: 1
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
            }else{
                console.log("room size = " + res.size);
            }
            });





//        var r = document.getElementById("response");
//        var sr = document.getElementById("submitResponse");
//        r.style.display = "block";
//        sr.style.display = "block";

        //getResponseQuestion("1");
        //getSpecialQuestion();
        //getMCQuestion();


    }).catch(function(error){
        console.error("Got an error: ", error);
    });

    // CALLING FOR GAMES/QUESTIONS HERE


//    console.log("call response question");
//    getResponseQuestion();

    //getSpecialQuestion();


    //console.log("before initial mc question call");
    //getMCQuestion();

})

//========================FUNCTIONS=============================//
//setting up the Question stuff
function setupQuestion(){
                //getting stuff from html body
                var q = document.getElementById("questionOutput");
                var r = document.getElementById("response");
                var sr = document.getElementById("submitResponse");
                var s = document.getElementById("score");
                var qo1 = document.getElementById("questionOption1");
                var qo2 = document.getElementById("questionOption2");
                var qo3 = document.getElementById("questionOption3");
                var qo4 = document.getElementById("questionOption4");
                var qo5 = document.getElementById("questionOption5");

                //hiding it all to start with
                q.style.display = "none";
                s.style.display = "none";
                r.style.display = "none";
                sr.style.display = "none";
                qo1.style.display = "none";
                qo2.style.display = "none";
                qo3.style.display = "none";
                qo4.style.display = "none";
                qo5.style.display = "none";
                console.log("im getting in");
                }
//HIDING THE QUESTION STUFF
function doSomething(){
    var q = document.getElementById("questionOutput");
    var r = document.getElementById("response");
    var sr = document.getElementById("submitResponse");

    q.style.display = "none";
    r.style.display = "none";
    sr.style.display = "none";
}

//GETTING A RESPONSE QUESTION

function getResponseQuestion(){
    
//    var q = document.getElementById("questionOutput");
//    q.style.display = "block"

    var r = document.getElementById("response");
    var sr = document.getElementById("submitResponse");

    r.style.display = "block";
    sr.style.display = "block";

 
    //Get Random Number
    //var randN = Math.floor(Math.random() * 10);
    
    
                //CODE TO SHOW COUNTDOWN PROGRESS BAR
            var timeleft = 10;
            var downloadTimer = setInterval(function(){
                document.getElementById("progressBar").value = 10 - timeleft;
                timeleft -= 1;
                    if(timeleft <= 0)
                        clearInterval(downloadTimer);
                }, 1000);

           
    const docRefQ = firestore.collection("questions").doc("FirstQuestion");


        docRefQ.get().then(function(doc){
            if(doc.exists){
                const questionName = doc.data();
                console.log("the doc data = ", questionName.question);
                //Save question WITH COOKIE
                document.cookie = "question" + "=" + questionName.question + ";"
                questionOutput.innerText = questionName.question;
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    }


//SUBMIT RESPONSE BUTTON CLICK
// saves the question output and response in the
// questions response collection which containes multiple
// players responses by getting cookies
//
submitResponse.addEventListener("click", function(){

    const questionToSave = questionOutput.value;

    const responseToSave = response.value;


    var rsp = document.getElementById("response");
    var srb = document.getElementById("submitResponse");

    console.log("current question = " + questionToSave);

    //Get Random Number WITH COOKIE
    var p = getCookie("playerName");

    //var r = getCookie("randomNumber");
    var pNum = getCookie("playerNumber");
    var q = getCookie("question");


    //console.log("p = " + p + " r = " + r);

    const docRefQ = firestore.collection("questions").doc("FirstQuestion").collection("responses").doc(window.localPlayerName);
    console.log("I am going to save " + p + "'s response to Firestore in this question: " + q + "'s player responses");

    //get playerNumber
//    firestore.collection("questions").doc("FirstQuestion").collection("responses").doc(p).get().then(function(doc){
//            if(doc.exists){
//                const playerData = doc.data();
//                const playerNumber = playerData.score;
//
//                console.log("the players score = " + playerScoreToGet);
//                //Save score in a cookie
//
//                document.cookie = "score" + "=" + playerScoreToGet + ";";
//                score.innerText = "Score = " + playerScoreToGet;
//            }else{
//                console.log("no such");
//            }
//        }).catch(function(error){
//            console.log("error", error);
//        });


    docRefQ.set({
        response: responseToSave,
        playerName: localPlayerName,
        playerNumber: localPlayerNumber,
        roomNumber: "1"
        }).catch(function(error){
        console.error("Got an error: ", error);
    });

    //CHANGING PAGE NUMBER ONCE LAST PLAYER ANSWERS first Question

    firestore.collection("questions").doc("FirstQuestion").collection("responses").get().then(res => {
            console.log(res.size);
            if(res.size ==  "5"){
                 docRefR.set({
                        pageNumber: 2
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
            }else{
                console.log("room size = " + res.size);
            }
            });

    rsp.style.display = "none";

    srb.style.display = "none";
    
questionOutput.innerText = "waiting for others to answer";
    
    
    //Change page when everyone answers
    
     firestore.collection("questions").doc("FirstQuestion").collection("responses").get().then(res => {
            console.log(res.size);
            if(res.size > 1){
                 docRefR.set({
                        pageNumber: 3
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
            }else{
                console.log("room size = " + res.size);
            }
            });

    
    
    
 ClearField();
    //getResponseQuestion("1");
    //getSpecialQuestion();
    //getMCQuestion();

})

function ClearField() {
     document.getElementById("response").value = "";
}

//GETTING A SPECIAL QUESTION
function getSpecialQuestion(){

    var q = document.getElementById("questionOutput");
    //q.style.display = "block";
    q.innerText = "Special Question";

    var p = getCookie("playerName");
    var r = getCookie("randomNumber");

    firestore.collection("questions").doc("4").collection("responses").where("response", "==", "idk").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const qRs = doc.data();
            q.innerText = q.innerText + qRs.response;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


}

//ASKING EVERYONE WHOSE DOING WHAT THIS WEEKEND
//Whose ____ this weekend
//X,Y,Z
//function getGeneratedQuestion(){
function getGeneratedQuestion(n){

     var q = document.getElementById("questionOutput");
    //q.style.display = "block";
    q.innerText = "Generated Question Question";
    var p = getCookie("playerName");


    //Putting player (n)'s response into question

    console.log("getting question");
    firestore.collection("questions").doc("FirstQuestion").collection("responses").where("playerNumber", "==", "1").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const qRs = doc.data();
            q.innerText = "Who is " +  qRs.response + " this weekend??";
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    console.log("after getting question");


    //Add Buttons of player options!!!


    //Activate question option buttons
    var qO1 = document.getElementById("questionOption1");
    qO1.style.display = "block";
    var qO2 = document.getElementById("questionOption2");
    qO2.style.display = "block";
    var qO3 = document.getElementById("questionOption3");
    qO3.style.display = "block";
    var qO4 = document.getElementById("questionOption4");
    qO4.style.display = "block";
    var qO5 = document.getElementById("questionOption5");
    qO5.style.display = "block";


    console.log("player number = ");
     firestore.collection("questions").doc("FirstQuestion").collection("responses").where("playerNumber", "==", "1").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log("doc data =  ", doc.data());
            const pNs = doc.data();
            qO1.innerText = pNs.playerName;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    firestore.collection("questions").doc("FirstQuestion").collection("responses").where("playerNumber", "==", "2").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log("doc data =  ", doc.data());
            const pNs = doc.data();
            qO2.innerText = pNs.playerName;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    firestore.collection("questions").doc("FirstQuestion").collection("responses").where("playerNumber", "==", "3").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log("doc data =  ", doc.data());
            const pNs = doc.data();
            qO3.innerText = pNs.playerName;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

     firestore.collection("questions").doc("FirstQuestion").collection("responses").where("playerNumber", "==", "4").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log("doc data =  ", doc.data());
            const pNs = doc.data();
            qO4.innerText = pNs.playerName;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    firestore.collection("questions").doc("FirstQuestion").collection("responses").where("playerNumber", "==", "5").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log("doc data =  ", doc.data());
            const pNs = doc.data();
            qO5.innerText = pNs.playerName;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

//Checking Generated Question Button Clicks

    questionOption1.addEventListener("click", function(){

        console.log("clicked option 1");
        q.innerText = "You're right!";

    });

    questionOption2.addEventListener("click", function(){

        console.log("clicked option 2");

        q.innerText = "Nope!";

    });

    questionOption3.addEventListener("click", function(){

        console.log("clicked option 3");

        q.innerText = "Nope!";

    });


     questionOption4.addEventListener("click", function(){

         console.log("clicked option 4");

        q.innerText = "Nope!";


    });

     questionOption5.addEventListener("click", function(){

         console.log("clicked option 5");

        q.innerText = "Nope!";

     });

}


//GETTING PLAYER SCORE
function getPlayerScore(){

    const p = getCookie("playerName");
    firestore.collection("Room1").doc(p).get().then(function(doc){
            if(doc.exists){
                const playerData = doc.data();
                const playerScoreToGet = playerData.score;
                console.log("the players score ===== ");
                //Save score in a cookie

                document.cookie = "score" + "=" + playerScoreToGet + ";";
                //score.innerText = "Score = " + playerScoreToGet
                return Number(playerScoreToGet);
            }else{
                console.log("no such");
                return 100;
            }
        }).catch(function(error){
            console.log("error", error);
        })

}
//GETTING A MC QUESTION
function getMCQuestion(n){
//    var r = document.getElementById("response");
//    var sr = document.getElementById("submitResponse");
//    r.style.display = "none";
//    sr.style.display = "none";

    console.log("debugging before initiate");
    //Activate question option buttons and score
    var qO1 = document.getElementById("questionOption1");
    qO1.style.display = "block";
    var qO2 = document.getElementById("questionOption2");
    qO2.style.display = "block";
    var qO3 = document.getElementById("questionOption3");
    qO3.style.display = "block";

    //Add a scoreboard
    var s = document.getElementById("score");
    s.style.display = "block";
    s.style.fontSize = "12px";

    var p = getCookie("playerName");

    //Getting current score
//        firestore.collection("TestRoom").doc(p).get().then(function(doc){
//            if(doc.exists){
//                const playerData = doc.data();
//                const playerScoreToGet = playerData.score;
//
//                console.log("the players score = " + playerScoreToGet);
//                //Save score in a cookie
//
//                document.cookie = "score" + "=" + playerScoreToGet + ";";
//                score.innerText = "Score = " + playerScoreToGet;
//            }else{
//                console.log("no such");
//            }
//        }).catch(function(error){
//            console.log("error", error);
//        });


    //Getting random Multiple choice question

    // var i;
    //for(i = 0; i < 3; i++){
    //var randN = "mcq" + (Math.floor(Math.random() * 10)).toString();
//    var questionNum = "0";
//    const docRefQ = firestore.collection("questions").doc(questionNum);
//    if(questionNum == "0"){
//        console.log("questionNum = " + questionNum);
//        questionNum = "1";
//         console.log("questionNum = " + questionNum);
//    }
//    else if(questionNum =="1"){
//        questionNum = "2";
//        console.log("questionNum = " + questionNum);
//    }
    const docRefQ = firestore.collection("questions").doc("0");

    docRefQ.get().then(function(doc){
            if(doc.exists){
                const questionName = doc.data();
                console.log("the doc data IS HERE= ", questionName.question);
                //Save question WITH COOKIE
                document.cookie = "question" + "=" + questionName.question + ";";
                console.log("set question next");
                questionOutput.innerText = questionName.question;
                questionOption1.innerText = questionName.option1;
                questionOption2.innerText = questionName.option2;
                questionOption3.innerText = questionName.option3;
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
//}

    //Changing player score
        //var p = getCookie("playerName");

        //CORRECT RESPONSE
    questionOption1.addEventListener("click", function(){

        //console.log("whats going onongfangoahg");
        getPlayerScore();
        //get score from cookie
        //var playerScore = getCookie("playerScore");

        //const pscore = getPlayerScore();
        var oldScore = Number(getCookie("score"));
        console.log("the current player score = " + oldScore.toString());

        //var newScore = Number(getPlayerScore()) + 10;

        var newScore = Number(getCookie("score")) + 10;

        console.log("the new player score = " + newScore.toString());

        //Updating score
        firestore.collection("Room1").doc(p.toString()).update({
            score: newScore
        }).then(function() {
            score.innerText = newScore;
            document.cookie = "score" + "=" + newScore + ";";
            console.log("score changed to: ");



        //Inside
        getMCQuestion();
        }).catch(function(error) {
            console.error("Error adding doc");
        });


        //Outside
        //getMCQuestion();

    });

        // These two assignments are equivalent:

//// Old-school:
//var a2 = a.map(function(s){ return s.length });
//
//// ECMAscript 6 using arrow functions
//var a3 = a.map( s => s.length );
//
//// both a2 and a3 will be equal to [31, 30, 31, 31]

    questionOption2.addEventListener("click", function(){

        firestore.collection("Room1").get().then(res => {
            console.log(res.size);
            if(res.size ==  "9"){
            getMCQuestion();
            }
            });

        getMCQuestion();

    });

    questionOption3.addEventListener("click", function(){

        var a;
        for(a=0; a<1; a++){

            console.log("right before the call");
        getMCQuestion();
        }


    });

    //console.log("HELLO");
//setTimeout(function(){
//    console.log("THIS IS");
//}, 2000);
//console.log("DOG");
    //setTimeout(donothing,500);

}
//GETTING A COOKIE
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//THERE NEEDS TO BE A GET MCQUESTIONBUTTONRESPONSEMETHOD

//GET TRIVIA QUESTIONS IN ORDER
var correctAnswer;

function getTriviaQuestion(i){

    //console.log("what is i? " + i);

    //Activate question option buttons and score
    var qO1 = document.getElementById("questionOption1");
    qO1.style.display = "block";
    var qO2 = document.getElementById("questionOption2");
    qO2.style.display = "block";
    var qO3 = document.getElementById("questionOption3");
    qO3.style.display = "block";

    //Add a scoreboard
    var s = document.getElementById("score");
    s.style.display = "block";
    s.style.fontSize = "12px";

    //Getting trivia questions
    const ii = i.toString();

    const docRefTQ = firestore.collection("questions").doc(ii);
    //var correctAnswer;

    docRefTQ.get().then(function(doc){
            if(doc.exists){
                const questionName = doc.data();

                console.log("the doc data IS HERE= ", questionName.question);
                //Save question WITH COOKIE
                document.cookie = "question" + "=" + questionName.question + ";";
                console.log("set question next");
                questionOutput.innerText = questionName.question;
                questionOption1.innerText = questionName.option1;
                questionOption2.innerText = questionName.option2;
                questionOption3.innerText = questionName.option3;

                console.log("in firestore the correct answer is " + questionName.correctAnswer);

                correctAnswer = questionName.correctAnswer;

                // SAVE CORRECT ANSWER AS A COOKIE..
                //document.cookie = "correctAnswer" + "=" + correctAnswer + ";";

                //make sure its working
                console.log("the correct answer is saved as" + correctAnswer);


            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });

    console.log("the correct answer is saved asssssss " + correctAnswer);


    //Question Button Options

    questionOption1.addEventListener("click", function(){

        //getPlayerScore();
        //Updating score
//        firestore.collection("Room1").doc(p.toString()).update({
//            score: newScore
//        }).then(function() {
//            score.innerText = newScore;
//            document.cookie = "score" + "=" + newScore + ";";
//            console.log("score changed to: ");
        //questionOption1.style.color = "black";
        var curColor = questionOption1.style.backgroundColor;
        if((curColor != 'red') || (curColor == 'grey')){
        questionOption1.style.background = "red";
        curColor = 'red';
        }
        else if(curColor == 'red'){
        questionOption1.style.background = "grey";
        }

        console.log("option 1 selected");

        console.log("selected " + questionOption1.innerText + " and correct answer is " + correctAnswer);

    });


    questionOption2.addEventListener("click", function(){



        console.log("option 2 selected");

        var curColor = questionOption2.style.backgroundColor;
        if((curColor != 'red') || (curColor == 'grey')){
        questionOption2.style.background = "red";
        }
        else if(curColor == 'red'){
        questionOption2.style.background = "grey";
        }

    });

    questionOption3.addEventListener("click", function(){

        console.log("option 3 selected");

        var curColor = questionOption3.style.backgroundColor;
        if((curColor != 'red') || (curColor == 'grey')){
        questionOption3.style.background = "red";
        }
        else if(curColor == 'red'){
        questionOption3.style.background = "grey";
        }

    });

    if(i == 20){
        return;
    }

    //Where you check to see that everyone has answered
    //if(everyone has answered)
    //CHANGING PAGE NUMBER IF LAST PLAYER HAS SELECTED ANSWER
//           docRefTQ.get().then(function(doc){
//            if(doc.exists){
//                const answers = doc.data();
//
//                var answersIn = answers.answersIn;
//
//                console.log("answers in are " + answersIn);
//
//                docRefTQ.update({
//                        answers: answersIn + 1
//                    }).catch(function(error){
//                        console.error("got an error", error);
//                    });
//
//                if(answersIn == 5){
//                    docRefR.set({
//                        pageNumber: 2
//                    }).catch(function(error){
//                        console.error("got an error", error);
//                    });
//                }
//
//
//            }else{
//                console.log("no such");
//            }
//        }).catch(function(error){
//            console.log("error", error);
//        });



    //EMBEDDED INTO everyone has answered CHECK



            //Where you findout the correct
            console.log("wtf" + correctAnswer);
            if((questionOption1.style.backgroundColor == 'red')){

                //add a life
                console.log("got the right answer");

            }

    // FUCK AROUND
    //setTimeout(getTriviaQuestion(2), 10000);


}

//NEW FUNCTIONS AND FEATURES

//Waits 30 seconds before checking responses/submitting responses

function checkAnswer(){

//    var p = getCookie("playerName");
//    var pNum = getCookie("playerNumber");
//    firestore.collection("questions").doc("FirstQuestion").collection("responses").doc(playerName.toString()).set({
//        response: responseToSave,
//        playerName: playerName,
//        playerNumber: "22",
//        roomNumber: "1"
//        }).catch(function(error){
//        console.error("Got an error: ", error);
//    });
    
    alert("time has elapsed, response has been submitted");
    firestore.collection("PageNumber").doc("CurrentPage").update({
                        pageNumber: 2
                    }).catch(function(error){
                        console.error("got an error", error);
                    });

}

// PIC STUFF

var fileButton = document.getElementById('fileButton');

var uploader = document.getElementById('uploader');

fileButton.addEventListener('change', function(e){
    //get file

    var file = e.target.files[0];

    //create storage ref
    var storageRef = firebase.storage().ref('idk/' + file.name);

    //upload file

    var task = storageRef.put(file);
    //update progress bar
    task.on('state_changed',

            function progress(snapshot){
        var percentage = snapshot.bytesTransferred / snapshot.totalBytes *100;
        uploader.value = percentage;
    },
            function error(err){

    },
            function complete(){

    }  
           );          
                            });

var showPic = document.getElementById('showPic');

showPic.addEventListener("click", function(){

    var storage2 = firebase.storage();

    var storage2Ref = storage2.ref();
    var spaceRef = storage2Ref.child('idk/chasecivica.png');

    console.log("made it into showpic function");

            // Get the download URL
        storage2Ref.child('idk/chasecivica.png').getDownloadURL().then(function(url) {
          // Insert url into an <img> tag to "download"
            var test = url;
            document.getElementById('img').src = test;
        }).catch(function(error) {
            console.log("didn't work ");
        });
});

//RESETS TO PAGE 0 if window is closed
//window.onbeforeunload = closingCode;
window.onbeforeunload = confirmExit;

function confirmExit(){
    
    alert("confirm exit is being called");

    firestore.collection("PageNumber").doc("CurrentPage").update({
                        pageNumber: 0
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    return false;
}

// ======================= UPDATING =========================== //
getRealtimeUpdates = function () {
    docRefR.onSnapshot( function(doc){
        updateScreen(doc);
    });
}

function updateScreen(doc){
    //console.log("here35");
    var i = 0;
    if(doc && doc.exists){
        const myData = doc.data();
        //console.log("here2");

        
         

        // WHERE IT TRACKS ROOM SIZE
        firestore.collection("Room1").get().then(res => {
            console.log("firt room size print is " + res.size);

            roomSize = res.size;

         console.log("room size = " + roomSize);
            });

       
        // WHERE PAGE NUMBER IS TRACKED
        if(myData.pageNumber == 1){
            console.log("page 1");
            
            i = 1;
            //for(i = 0; i < 10; i++){
                getTriviaQuestion(i);
            //}
            
            setTimeout(checkAnswer, 12000);
        }
        else if(myData.pageNumber == 2){
            //RESET TIMER
            document.getElementById("progressBar").value = 0;

            getResponseQuestion();
        }
        else if(myData.pageNumber == 3){
            
            
            document.getElementById("progressBar").value = 0;

            getTriviaQuestion(3);
            
            setTimeout(checkAnswer, 12000);
            
    }
}
}

//console.log("heregha");
getRealtimeUpdates();


//RESET FIRESTORE TO PAGE 0
window.onbeforeunload = confirmExit;

function confirmExit(){
    alert("confirm exit is being called");
    firestore.collection("PageNumber").doc("CurrentPage").update({
                        pageNumber: 0
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    return false;

}


