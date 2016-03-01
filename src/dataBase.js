// var myDataRef = new Firebase('https://s1eupheaues.firebaseio-demo.com/');
var myDataRef = new Firebase('https://oreimo-runner.firebaseio.com/');
var highscoreRef = myDataRef.child("highscore");
var arr = [];
var inputVisible = false;
var highscore = 0;

// Authentification
myDataRef.authAnonymously(function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}, { remember: "sessionOnly" });


$( document ).ready(function() {
    var inputName = $('#input');    // dubbed in mainGame.js
    inputName.hide();

    $('#textInput').keypress(function(e) {
    	if(e.keyCode == 13) {
	        var playerName = $('#textInput').val();
	        
            var playerExists = null;
	        var dbScore = null;
			highscoreRef.once('value', function(dataSnapshot) {
				playerExists = dataSnapshot.child(playerName).exists();
		  		console.log(playerExists);
		  		dbScore = dataSnapshot.child(playerName).val();
		  		console.log(dbScore);


		  		if (playerExists) {
                    // if score <= new score, do nothing
				if (score <= dbScore) {
					console.log('score <= dbScore');
				} else {
                    // if score > new score, update
					var playerRef = highscoreRef.child(playerName);
	      			playerRef.set(score);
	      			console.log('new score set');
				}
			} else {
                // new player and score
				var playerRef = highscoreRef.child(playerName);
	      		playerRef.set(score);
	      		console.log('new player AND new score set');
			}
			Refresh();
			SortResultsAndShow();

			});
            inputVisible = false;
            /*
	        var playerRef = highscoreRef.child(playerName);
	        playerRef.set(score);
			Refresh();
			SortResultsAndShow();
            inputVisible = false;
            */
	    // arr.push() and then with binary search maybe put where it should be and reload array
    	}
        
	});


   // ShowHideInput(inputName);
    
});

SortResultsAndShow();


// ====== Functions:

function SortResultsAndShow() {
highscoreRef.orderByValue().once('value').then(function(snapshot) {
  // The Promise was "fulfilled" (it succeeded).
  	snapshot.forEach(function(data) {
  		arr.push({playerName: data.key(), score: data.val()});
  		// console.log(data.key() +' '+data.val());
	});
	arr.reverse();
	// arr.forEach(function(element) {console.log(element.playerName +' '+element.score)});
   
    // PROMISE
    var topScorePromise = new Promise(function(){
	//setTimeout(function(){alert('crap');}, 1000);
        topScore = arr[0].score;
       // console.log(topScore);
        }, function(error){
            console.log(error);
        alert(error);
    });
    
	var ul = $('.myUl');
	$.each(arr, function(i) {
		
	
    var li = $('<li/>')
	    .appendTo(ul);
    var nameSpan = $('<span/>')
        .addClass('nameSpan')
	   	.text(arr[i].playerName/* +': '+arr[i].score*/)
        .appendTo(li);
	var scoreSpan = $('<span/>')
        .addClass('scoreSpan')
		.text(arr[i].score)
		.appendTo(li);
	});

}, function(error) {
  // The Promise was rejected.
  console.error(error);
});

}

function Refresh() {
	$('li').detach();	// or remove()?
	arr = [];
}

function ShowHideInput(el) {
   if (inputVisible) {
       el.show();
    } else {
       el.hide(); 
    }
}

