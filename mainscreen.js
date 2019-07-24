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

//BUTTON STUFF
var winner = document.getElementById("winner");

var roomNumber = document.getElementById("room");


//REFERENCE TO SCORES

//FINDOUT HOW TO FIND WHAT GAME TO DISPLAYYYYYYYY
//===============================================


docRefS = firestore.collection("12");

//VAR for leader
var currentLeaderScore = 0;


//FUNCTIONS
function showLeaderPic(path){
    
    //var apath = path.toString();
        var storage2 = firebase.storage();

        var storage2Ref = storage2.ref();
    
    //console.log("PATH IS: " + path);
    
        // Get the download URL
        storage2Ref.child(path).getDownloadURL().then(function(url) {
          // Insert url into an <img> tag to "download"
            var test = url;
            document.getElementById('winnerPic').src = test;
        }).catch(function(error) {
            console.log("didn't work ");
        });
    
}


function addPlayer(){
        var storage2 = firebase.storage();

        var storage2Ref = storage2.ref();
    
    console.log("PATH IS: " + path);
    
        // Get the download URL
        storage2Ref.child(path).getDownloadURL().then(function(url) {
          // Insert url into an <img> tag to "download"
            var test = url;
            document.getElementById('img').src = test;
        }).catch(function(error) {
            console.log("didn't work ");
        });
}

//var test2;
function showPlayers(path){
  //var apath = path.toString();
        var storage2 = firebase.storage();

        var storage2Ref = storage2.ref();
    
    console.log("PATH ISSSSSSSSSSSSSSSSSSSSSSSSSSS: " + path);
    
        // Get the download URL
        storage2Ref.child(path).getDownloadURL().then(function(url) {
          // Insert url into an <img> tag to "download"
            var test2 = url;
            //var playerPict = document.createElement("img");
            playerPict.src = test2;
            var src = document.getElementById("body");
            src.appendChild(playerPict);
            //document.getElementById('playerPict').src = test2;
            //document.body.appendChild(playerPict);
        }).catch(function(error) {
            console.log("didn't work ");
        });    
}

function addPics(){
    var playerPictures = document.createElement("img");
    playerPictures.src = test2;
                    
    console.log("SHOULD BE ADDING PIC");
    document.body.appendChild("playerPictures");
}

//var playerPict;




// UPDATING SCREEN
getRealtimeUpdates = function () {

    
    docRefS.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const myData = doc.data();
                // doc.data() is never undefined for query doc snapshots
                //console.log("something");
                //console.log("the players scores" + myData.playerName + "  " + myData.score);
                //console.log(doc.id, " => ", doc.data());
                
                if(myData.score > currentLeaderScore){
                    
                    currentLeaderScore = myData.score;
                    winner.innerText = "LEADER = " + myData.playerName;
                    //get pic file name by adding pic file name to each player when upload pic
                    
                    var path = myData.roomNumber + '/' + myData.playerName + '/' + myData.picFileName;
                    showLeaderPic(path);
                   
                }
                
            });
        });
    
    //showPlayers();
    //addPics();   

}

getRealtimeUpdates();
