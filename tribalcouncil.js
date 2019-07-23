//=========================================================================================
//=============================Initializing Firebase=======================================
//=========================================================================================
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


//=========================================================================================
//=============================Creating References to Database===============================
//=========================================================================================
//Reference to Room
//const docRef1 = firestore.collection("Room1");

////Reference to Page Number
//const docRefR = firestore.collection("PageNumber").doc(playerR);


//=========================================================================================
//=================================HTMLTEXTS/BUTTONS=======================================
//=========================================================================================
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




//=========================================================================================
//========================================LOCAL/GLOBAL VARIABLES===================================
//=========================================================================================
// SMART TO SAVE EACH PLAYERS DATA GLOBALLY AND RE-ACCESS IT
// BETTER THAN COOKIES FOR SURE

//ROOM SIZE
var roomSize = 0;

//USERS PLAYERNAME
var localPlayerName;

//USERS PLAYERNUMBER
var localPlayerNumber;

//USERS SCORE
var playerScore = 0;

//USERS ROOM
var playerRoom;

// VARIABLE CURRENT PAGE = 0, then after they enter increment
var currentPage = 0;

//ANSWERS
//for response question
var currentResponseAnswer;
var correctResponseAnswer;
//for trivia question
var currentTriviaAnswer;
var correctTriviaAnswer;


//NEW MC ANSWER
var correctMCAnswer;







var docRefR;
//.doc(window.playerRoom);



//================================================================================================
//==========================================SETUP ROOM/GAME==========================================
//=================================================================================================
//JOIN ROOM BUTTON CLICK
//First - save the room# input and playerName input to firestore
//Second - put the room# and playerName at the top of the screen
//Third - erase the unneeded text field and buttons
//Fourth - call the changeQuestion function
//         ...this function gets a question from the database and displays it
//          ...this function also unblocks a text entry and button to collect responses
//var docRef1;

joinRoom.addEventListener("click", function(){
    const roomToSave = roomID.value;
    const playerToSave = playerName.value;
    console.log("I am going to save " + roomToSave + " and " + playerToSave + " to Firestore");

    window.playerRoom = roomToSave;
    
    docRefR = firestore.collection("PageNumber").doc(window.playerRoom);
    

    window.localPlayerNumber = roomSize;
    
    console.log("ROOM SETUP AS # " + roomToSave);


    firestore.collection(roomToSave).doc(playerToSave).set({
        playerName: playerToSave,
        playerNumber: roomSize,
        roomNumber: roomToSave,
        score: 0.0
    }).then(function(){
        //SAVE THE COOKIE!!!
        //create a cookie
        //document.cookie = playerToSave;
        
        localPlayerName = playerToSave;
        
        document.cookie = "playerName" + "=" + playerToSave + ";"

        document.cookie = "playerNumber" + "=" + roomToSave + ";"

        //console.log("Document written with Room ID: ", docRef1.id);
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
            firestore.collection(roomToSave).get().then(res => {
            console.log(res.size);
            if(res.size ==  "5"){
                //CHANGE CURRENT PAGE NUMBER
                
                //nextPage();
                window.currentPage += 1;
                
                 docRefR.set({
                        pageNumber: 1
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
            }else{
                console.log("room size = " + res.size);
            }
            });


        getRealtimeUpdates();





    }).catch(function(error){
        console.error("Got an error: ", error);
    });



})


//================================================================================================
//==============================================FUNCTIONS==========================================
//==============================================================================================

//====================================RESPONSE QUESTION============================================
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
                
                questionOutput.innerText = questionName.question;
                
            //save question answer
                
                correctResponseAnswer = questionName.answer;
                
                console.log("THE CURRENTQA IS " + correctResponseAnswer);
                
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    }

//SUBMIT RESPONSE BUTTON
submitResponse.addEventListener("click", function(){

    const questionToSave = questionOutput.value;

    const responseToSave = response.value;
    
    //save current Player Answer
    currentResponseAnswer = responseToSave;

    console.log("I am saving the latest player Answer!! ASSSSSS " + currentResponseAnswer);

    var rsp = document.getElementById("response");
    var srb = document.getElementById("submitResponse");


    //console.log("p = " + p + " r = " + r);

    const docRefQ = firestore.collection("questions").doc("FirstQuestion").collection("responses").doc(window.localPlayerName);
    console.log("I am going to save " + p + "'s response to Firestore in this question: " + q + "'s player responses");


    docRefQ.set({
        response: responseToSave,
        playerName: localPlayerName,
        playerNumber: localPlayerNumber,
        roomNumber: "1"
        }).catch(function(error){
        console.error("Got an error: ", error);
    });



    rsp.style.display = "none";

    srb.style.display = "none";
    
    questionOutput.innerText = "waiting for others to answer";
    
    
    ClearField();
    
    
})


//CHECK ANSWER OF RESPONSE QUESTION
function checkResponseAnswer(){

    console.log("latest player answer = " + currentResponseAnswer);
    console.log("current question answer = " + correctResponseAnswer)
    
    if(currentResponseAnswer == correctResponseAnswer){
        
        // change current local score and display it
        playerScore = playerScore + 10;
        
        
        
        //change the player score in database
          firestore.collection("Room1").doc(localPlayerName).update({
                        score: playerScore
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    
        //change the player score displayed on site
        score.innerText = playerScore;
        
        
        //next page
        nextPage();
        
        
    }else{
        //ELIMINATED
        //TAKE THEM TO VIEWING SCREEN
        
    //or next page for now
        nextPage();
        
        
    }
    

    
    alert("time has elapsed, response has been submitted");
    
//    firestore.collection("PageNumber").doc("CurrentPage").update({
//                        pageNumber: 2
//                    }).catch(function(error){
//                        console.error("got an error", error);
//                    });
//    
    
    
    

}



//CLEARING TEXT FIELD
function ClearField() {
     document.getElementById("response").value = "";
}



//=======================================TRIVIA QUESTION===================================
// ======================= NEW GET/CHECK MC QUESTION ====================================

option1 = document.getElementById("questionOption1");
var currentMCAnswer;

function getMCQuestion(i){
    
    var q = document.getElementById("questionOutput");
    q.style.display = "block";
    
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
                
                correctMCAnswer = questionName.correctAnswer;

                console.log("the doc data IS HERE= ", questionName.question);
                //Save question WITH COOKIE
                //document.cookie = "question" + "=" + questionName.question + ";";
                console.log("set question next");
                
                
                
                questionOutput.innerText = questionName.question;
                questionOption1.innerText = questionName.option1;
                questionOption2.innerText = questionName.option2;
                questionOption3.innerText = questionName.option3;

                console.log("in firestore the correct answer is " + questionName.correctAnswer);

                //correctAnswer = questionName.correctAnswer;

                // SAVE CORRECT ANSWER AS A COOKIE..
                //document.cookie = "correctAnswer" + "=" + correctAnswer + ";";

                //make sure its working
                console.log("the correct answer is saved as" + correctTriviaAnswer);


            }else{
                
                
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    
}

function checkMCAnswer(buttonID){
    //console.log("option1 = " + option1.innerText + "and the correct option is " + correctMCAnswer);
    
    console.log("BUTTONID = " + buttonID);
    
    currentMCAnswer = document.getElementById(buttonID);
    
    
    
    //CHECK ANSWER
    if(currentMCAnswer.innerText == correctMCAnswer){
        
        playerScore += 10;
        changePlayerScoreBool = true;
        //changePlayerScore();
        
        
    }else{
        changePlayerScoreBool = false;
    }
    
    
    //HIDE STUFF
    var qO1 = document.getElementById("questionOption1");
    qO1.style.display = "none";
    var qO2 = document.getElementById("questionOption2");
    qO2.style.display = "none";
    var qO3 = document.getElementById("questionOption3");
    qO3.style.display = "none";
    
    
    
    
    //CHECK TO SEE IF LAST PERSON ANSWERS
    //HAVE to change the # of players to answer question
    //if()
    
    
    
    
    
}


//======================================PLAYER SCORE=============================================
var changePlayerScoreBool = false;;

function changePlayerScore(){
    
        console.log("PLAYER SCORE ISSSS " + playerScore);
        //change the player score in database
          firestore.collection(playerRoom).doc(localPlayerName).update({
                        score: playerScore
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    
        //change the player score displayed on site
        score.innerText = playerScore;
        
}


//==============================================PIC STUFF=========================================
// UPLOADING PICS TO DATABASE
var fileButton = document.getElementById('fileButton');
var fileButtonHolder = document.getElementById('fileButtonHolder');
var uploader = document.getElementById('uploader');
var picName;
var imageOnPage = document.getElementById('img');
fileButton.addEventListener('change', function(e){
    //get file

    var file = e.target.files[0];

    //create storage ref
    var storageRef = firebase.storage().ref(playerRoom + '/' + localPlayerName + '/' + file.name);

    //save file name
    picName = file.name;
    
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
        addProfilePic();

    }  
           );          
                            });

//adding function to immediantely upload profile pic
function addProfilePic(){
    
   imageOnPage.style.display = "block";
    
    var storage2 = firebase.storage();

    var storage2Ref = storage2.ref();
    var spaceRef = storage2Ref.child(playerRoom + '/' + localPlayerName + '/' + picName);

    console.log("made it into showpic function");

            // Get the download URL
        storage2Ref.child(playerRoom + '/' + localPlayerName + '/' + picName).getDownloadURL().then(function(url) {
          // Insert url into an <img> tag to "download"
            var test = url;
            document.getElementById('img').src = test;
        }).catch(function(error) {
            console.log("didn't work ");
        });
    
    
    //Adding pic file name to player data
    console.log("ROOM IS " + playerRoom + "PLAYER IS " + localPlayerName);
    firestore.collection(playerRoom).doc(localPlayerName).update({
                        picFileName: picName
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    
    
}


// DISPLAYING PICS FROM DATABASE
//var showPic = document.getElementById('showPic');
//showPic.addEventListener("click", function(){
//
//    var storage2 = firebase.storage();
//
//    var storage2Ref = storage2.ref();
//    var spaceRef = storage2Ref.child(playerRoom + '/' + localPlayerName + '/' + picName);
//
//    console.log("made it into showpic function");
//
//            // Get the download URL
//        storage2Ref.child(playerRoom + '/' + localPlayerName + '/' + picName).getDownloadURL().then(function(url) {
//          // Insert url into an <img> tag to "download"
//            var test = url;
//            document.getElementById('img').src = test;
//        }).catch(function(error) {
//            console.log("didn't work ");
//        });
//});



//======================================QUESTION SETUP=========================================

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
    
                var fb = document.getElementById("fileButtonHolder");
                var upb = document.getElementById("uploader");
                

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
    
    
                fb.style.display = "none";
                upb.style.display = "none";
    
    
                //hiding image
                imageOnPage.style.display = "none";
    
    
    
    
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


function clearPage(){
                var q = document.getElementById("questionOutput");
                var r = document.getElementById("response");
                var sr = document.getElementById("submitResponse");
                var qo1 = document.getElementById("questionOption1");
                var qo2 = document.getElementById("questionOption2");
                var qo3 = document.getElementById("questionOption3");
                var qo4 = document.getElementById("questionOption4");
                var qo5 = document.getElementById("questionOption5");
    

                //hiding it all to start with
                q.style.display = "none";
                r.style.display = "none";
                sr.style.display = "none";
                qo1.style.display = "none";
                qo2.style.display = "none";
                qo3.style.display = "none";
                qo4.style.display = "none";
                qo5.style.display = "none";
                console.log("im getting in");
}


//================================END GAME / SHOW LEADERBOARDS ==============================

function endGame(){
    window.location.href = "./mainscreen.html";
}
//
//function showLeaderboards(){
//    
//}



//=========================================================================================
// ====================================PAGE UPDATING STUFF ================================
//=========================================================================================


setupQuestion(); 

//NEXT PAGE FUNCTION
function nextPage(){
  
    currentPage += 1;
    
    
    console.log("CHANGING CURRENT PAGE HEREEE TO " + currentPage);
        firestore.collection("PageNumber").doc(window.playerRoom).update({
                        pageNumber: currentPage
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    
}

//PROGRESS BAR
var progress = document.getElementById("progressBar");

function startTimer(time){
    var timeleft = parseInt(time);
    var downloadTimer = setInterval(function(){
        document.getElementById("progressBar").value = 10 - timeleft;
        timeleft -= 1;
        
        console.log("TIME LEFT = " + timeleft);
            if(timeleft <= 0){
                clearPage();
                if(changePlayerScoreBool == true){
                    changePlayerScore();
                }
                
                nextPage();
                clearInterval(downloadTimer);
            }
        }, 1000);
}

//CHANGING PAGE NUMBER
function updateScreen(doc){
    //console.log("here35");
    var i = 0;
    if(doc && doc.exists){
        const myData = doc.data();
        //console.log("here2");
    console.log("MADE IT INTO THE DOCUMENTTTTT");
         

        // WHERE IT TRACKS ROOM SIZE
        firestore.collection(playerRoom).get().then(res => {
            console.log("firt room size print is " + res.size);

            roomSize = res.size;

         console.log("room size = " + roomSize);
            });
        
        // WHERE CURRENT ANSWERS ARE CALCULATED
        
        

       
        // WHERE PAGE NUMBER IS TRACKED
        if(myData.pageNumber == 1){
            //console.log("MADE IT INTO UPDATE W/page 1");
            //SHOW PIC STUFF

            uploader.style.display = "block";
            fileButtonHolder.style.display = "block";
        
            
            //setTimeout(nextPage, 10000);
            //move();
            startTimer("9");
            
        }
        else if(myData.pageNumber == 2){
            //HIDE PIC STUFF
            fileButton.style.display = "none";
            fileButtonHolder.style.display = "none";
        
            uploader.style.display = "none";
            //RESET TIMER
            document.getElementById("progressBar").value = 0;

            getMCQuestion("2");
            
            startTimer("10");
            //getResponseQuestion();
            //setTimeout(checkResponseAnswer, 12000);
    
        }
        else if(myData.pageNumber == 3){
            document.getElementById("progressBar").value = 0;
            
            
            getMCQuestion("22");
            
            startTimer("10");
            
            
    }
          else if(myData.pageNumber == 4){
              
              
              endGame();
            
//            document.getElementById("progressBar").value = 0;
//              
//            getMCQuestion("4");
//            
//            startTimer("10");

            
    }
          else if(myData.pageNumber == 5){
            
            document.getElementById("progressBar").value = 0;

            getMCQuestion("5");
            
            startTimer("10");
    
            
    }
             else if(myData.pageNumber == 6){
            
            document.getElementById("progressBar").value = 0;

            getMCQuestion("6");
            
            startTimer("10");
    
            
    }
             else if(myData.pageNumber == 7){
            
            document.getElementById("progressBar").value = 0;

            getMCQuestion("7");
            
            startTimer("10");
    
            
    }
             else if(myData.pageNumber == 8){
            
            document.getElementById("progressBar").value = 0;

            getMCQuestion("8");
            
            startTimer("10");
    
            
    }
             else if(myData.pageNumber == 9){
            
            document.getElementById("progressBar").value = 0;

            getMCQuestion("9");
            
            startTimer("10");
    
            
    }
              else if(myData.pageNumber == 10){
            
            document.getElementById("progressBar").value = 0;

            getMCQuestion("10");
            
            startTimer("10");
    
            
    }
        else if(myData.pageNumber == 100) {
            
            endGame();
            //showLeaderboards();
        }
}
}


getRealtimeUpdates = function () {
    console.log("MADE IT INTO REALTIMEEE");
    //if(docRefR != null){
        //console.log("MADE IT before update screen");
        console.log("DocRefR = " + playerRoom);
    //if(playerRoom != 0){
    
    docRefR.onSnapshot( function(doc){
        console.log("MADE IT INTO update screen");
        updateScreen(doc);
    });
    //}
//}
}
console.log("heregha");

if(playerRoom != null){
getRealtimeUpdates();
}

//RESET FIRESTORE TO PAGE 0 on EXIT
window.onbeforeunload = confirmExit;

function confirmExit(){
    alert("confirm exit is being called");
    firestore.collection("PageNumber").doc(playerRoom).update({
                        pageNumber: 0
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    return false;

}


