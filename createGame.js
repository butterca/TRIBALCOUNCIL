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

const roomNumber = document.getElementById("roomID");
const numberOfPlayers = document.getElementById("playerNumber");


createGame.addEventListener("click", function(){
    const roomToSave = roomNumber.value;
    const playerNumber = numberOfPlayers.value;
    

    firestore.collection("RoomData").doc(roomToSave).set({
        roomNumber: roomToSave,
        numberOfPlayers: playerNumber,
        pageNumber: 0
    }).then(function(){
        
        
        window.location.href = "./tribalcouncil.html";

    }).catch(function(error){
        console.error("Got an error: ", error);
    });

    console.log("MAKING IT TO first RT CALL")


})