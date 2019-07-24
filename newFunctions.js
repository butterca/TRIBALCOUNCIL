//==================== IS IT TRUE??? ===============================//     

            //Send all players a different T/F question
              
              
              //Save all answers
              
              
              //Ask all other players the answer
              


// Get 5 random T/F questions and assign each one to a player 1-5
//function createTFQuestionArray(){
//    
//}


function getTFQuestionforPlayer(){
    //t document of localPlayerNumber
    questionOutput.style.display = "block";
    //get element by ID show T/F buttons
    
    
    firestore.collection("questions").doc(data[localPlayerNumber]).get().then(function(doc){
            if(doc.exists){
                const qData = doc.data();
                
                questionOutput.innerText = qData.question;
                
            //save question answer
                
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
}



//GET PLAYERS RESPONSE TO t/f question and save it

function getTFAnswer(buttonID){
    
    if(buttonID == true){
        firestore.collection("questions").doc(tfQuestion).update({
                        answer: true
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
            }
    else if(buttonID == false){
         firestore.collection("questions").doc(tfQuestion).update({
                        answer: false
                    }).catch(function(error){
                        console.error("got an error", error);
                    });
    }
    
}


//REDISTRUBUTE T/F Questions for other players to answer

function getTFQTest(){
    for(var i = 0; i <numberOfPlayers; i++){
        getTFQ(i);
    }
}

getTFQ(i){
    
    //ACTIVATE TF BUTTONS AGAIN
    
    firestore.collection("questions").doc(i).get().then(function(doc){
            if(doc.exists){
                const qData = doc.data();
                
                questionOutput.innerText = qData.playerName + qData.question2;
                
            //save question answer
                
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    
}


function checkTFNQAnswer(buttonID, i){
    
    firestore.collection("questions").doc(i).get().then(function(doc){
            if(doc.exists){
                const qData = doc.data();
                var correctTFAnswer = qData.answer;
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    
     
    if(buttonID == correctTFAnswer){
        //RIGHT ANSWER
        //increase score
            }
    else {
        //WRONG ANSWER
        //player out
    }
    
}









//HOW TO GENERATE RANDOM NUMBERS FOR PLAYERS

//CREATE A RANDOM NUMBERED ARRAY FOR PLAYERS AFTER LAST PERSON JOINS GAME
var data;
var RQA;
function getRandomQuestionArray(numberOfPlayers){
    data = [];
    for(var i = 0; i<numberOfPlayers; i++){
        
        data.push(i);
        
    }
    
    RQA = shuffle(data);
    
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


// from now on when you need a random player number simply enter data[localPlayerNumber]


//if you have a hundreds of MC questions and want to get 10 random unique questions
//Populate an array with the numbers 1 through 100.
//Shuffle it.
//Take the first 8 elements of the resulting array.


















//==================== WHATS THE LIE??? ===================================//

//Prompts all players to submit two truths and a lie

//Saves the players truths/lie

//Asks other players to guess
















//================================= TAKE A STAB ================================//


//Asks all players a difficult MC Question to respond to

//Adds those players responses as buttons to MC Question

//Have players now answer the MC Question w/ all responses














// SHIT TO KNOW

//The following javascript function will delete any collection:
//
//deleteCollection(path) {
//    firebase.firestore().collection(path).listDocuments().then(val => {
//        val.map((val) => {
//            val.delete()
//        })
//    })
//}