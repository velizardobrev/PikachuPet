(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope) {
  //variables are below
  $scope.name = "Pikachu";
  $scope.stateOfBeing = "start";//state of pikachu
  $scope.stateOfBeingSave = "start";//getting information for previous turn
  $scope.stateOfBeingSave2 = "start";//getting information for the turn before previous turn
  $scope.gametext="Your goal is to make me happy. Choose wisely to please my needs!";
  $scope.hint="";
  $scope.states = ["hungry", "angry", "lazy", "sad"];
  $scope.score = 0;
  //controlling the clickability of the buttons with theese
  $scope.nextkey = true;
  $scope.feedkey = true;
  $scope.disciplinekey = true;
  $scope.trainingkey = true;
  $scope.petkey = true;

  //logic if pikachu is happy or sad //gameovercondition
  $scope.happy = false;   
  $scope.nothappy = false; 
  $scope.gameover = false;
  //counting the days
  $scope.daycounter = 1;
  ////////////////////////
  //array of all game text
  ////////////////////////
  $scope.text = [
  "0 is not used",
  "I need more food.",  //hungry text
  "I wanna eat something!", 
  "I need a snack.",
  "I'm very very hungry.", 
  "That looks tasty! And smells good too!",//end of hungry text
  "I wanna beat someone innocent!", //angry text
  "Today I wanna break something expensive.",
  "Trainer, you are very stupid!",
  "I wanna steal something...",
  "I'm a bad boy today.",  //end angry text
  "I wanna sleep the whole day!!!", //lazy text
  "I'm very sleepy today trainer.",
  "I dont want to do anything for the whole day.",
  "I need a to take a HUGE break today!",
  "This is a day-off for me.", //end lazy text
  "I wanna cry...", //sad text
  "I feel really sad.",
  "I'm sad.",
  "I'm cryin...",
  "Sadness is here today!", //end sad text
  "Nom, nom, nom, nom, nom...", //feed text
  "That thing taste great!",
  "Pokemon food is best food.",
  "MMMMMMM.... mmmmmmmm.",
  "Thats some healthy meal here.", //end feed text 
  "Pikachu is being introduced to some manners of good behaviour today.", //discipline text
  "I was a bad boy... I'm sorry!",
  "I learned my mistake...",
  "I won't ever do that again.",
  "I'm growing up and I'm learning from my mistakes.", //end discipline text
  "Work It Harder Make It Better...", //workout text
  "Do It Faster, Makes Us stronger...",
  "More Than Ever Hour After...",
  "Our Work Is Never Over.",
  "Harder, Better, Faster, Stronger!", //end workout text
  "Yay it tickles!", //pet text
  "Oh... Such a nice massage...",
  "I'm a good boy. Yeah I'm a good boy.",
  "Massage again?",
  "Tickle monster is here...", //end pet text 
  "Thank you, thanks to you I'm happy again!", //happy text
  "You've made the right choice.",
  "I feel great again.",
  "Noice choice u made!",
  "I feel great today. Thank you!", //end happy text 
  "You've made a wrong decision yesterday... and I'm not feeling well.", //gameover text
  "Nooooooooooo.... ooooooooooooouuuuuuuuuu...",
  "You action was wrong yesterday.",
  "Wrong choice, trainer. Wrong choice.",
  "I wanted something else...", //end gameover text 
  "Your goal is to make Pikachu happy each day!", //hints text
  "You should choose wisely what Pikachu really needs for the day.",
  "If Pikachu is telling you that he is hungry... maybe you should feed him.",
  "No pets were harmed during the development of this game.",
  "To do your action for the day click the button (feed,dicpline,trainning,pet)." //end hints text                                 
  ];
  ////////////////////////
  //end of all game text
  ////////////////////////
  //Functions star below
  //getting random numbers with this function
  $scope.getRandomInt= function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //controling active and inactive buttons
  $scope.Buttons = function () {
    $scope.nextkey = false;
    $scope.feedkey = true;
    $scope.disciplinekey = true;
    $scope.trainingkey = true;
    $scope.petkey = true;
  }
   //controling active and inactive buttons
  $scope.ButtonsInverse = function () {
    $scope.feedkey = false;
    $scope.disciplinekey = false;
    $scope.trainingkey = false;
    $scope.petkey = false;  
    $scope.nextkey = true;//blocking this key
  }
//start is function that controls new game button
  $scope.StartPika = function () {
    $scope.score = 0;
    $scope.daycounter = 1;//default value day 1
    $scope.stateOfBeing = "start2";//state of pikachu
    //active and inactive buttons
    $scope.Buttons();//setting the active and inactive buttons
    //printing text 
    $scope.gametext="Welcome im feeling great. Click Next Day Button to advance!";
    $scope.hint=$scope.text[$scope.getRandomInt(51, 55)];//random hint
    $scope.happy = false;   
    $scope.nothappy = false;
    $scope.gameover = false;
    
  };
  //nextday is function that controls next day button
  $scope.NextDay = function () {
    $scope.score = $scope.score + $scope.getRandomInt(1, 10);//getting some score each day
    //checking if pikachu is happy
    if ($scope.happy == true) {
      $scope.stateOfBeing = "happy";
      $scope.gametext=$scope.text[$scope.getRandomInt(41, 45)];//getting random text for happy state";
      $scope.hint=$scope.text[$scope.getRandomInt(51, 55)];//random hint
      $scope.score = $scope.score + $scope.getRandomInt(25, 50);//getting medium score
      //active and inactive buttons
      $scope.Buttons();//setting the active and inactive buttons
      //resetting happines values
      $scope.happy = false;
      $scope.nothappy = false;

      
    }
    else{
        //checking if pikachu is not happy with your choise
        //nested if
        if ($scope.nothappy == true && $scope.gameover == false) {
          //saving
          $scope.stateOfBeingSave2 =  $scope.stateOfBeingSave;
          $scope.stateOfBeingSave =  $scope.stateOfBeing;
          //updating state of pikachu and printing text
          $scope.stateOfBeing = "gameovernextturn";         
          $scope.gametext=$scope.text[$scope.getRandomInt(46, 50)];//getting random text for gameovernextturn state";
          $scope.hint=$scope.text[$scope.getRandomInt(51, 55)];//random hint
          //active and inactive buttons
          $scope.ButtonsInverse();

          $scope.daycounter = $scope.daycounter + 1;//counting days  

          //checking for gameover condition
        } else if ($scope.nothappy == true && $scope.gameover == true ) {
          //saving
          $scope.stateOfBeingSave2 =  $scope.stateOfBeingSave;
          $scope.stateOfBeingSave =  $scope.stateOfBeing;
          //updating state of pikachu and printing text
          $scope.stateOfBeing = "gameover";
          $scope.gametext="Its over man... GAME OVER!";
          $scope.hint=$scope.text[$scope.getRandomInt(51, 55)];//random hint
          $scope.nextkey = true;//blocking this key
          $scope.feedkey = true;//blocking this key
          $scope.disciplinekey = true;//blocking this key
          $scope.trainingkey = true;//blocking this key
          $scope.petkey = true;//blocking this key
          $scope.daycounter = $scope.daycounter + 1;//counting days  

        }
        //else is normal day
        else {
            //saving
            $scope.stateOfBeingSave2 =  $scope.stateOfBeingSave;
            $scope.stateOfBeingSave =  $scope.stateOfBeing;

            $scope.stateOfBeing = $scope.states[$scope.getRandomInt(0, 3)];
            //generating correct text responce based on pikachu needs
              switch ($scope.stateOfBeing) {
                case "hungry":
                  $scope.gametext= $scope.text[$scope.getRandomInt(1, 5)];//getting random text for hungry state
                break;
                case "angry":
                  $scope.gametext= $scope.text[$scope.getRandomInt(6, 10)];//getting random text for angry state
               break;
                case "lazy":
                 $scope.gametext= $scope.text[$scope.getRandomInt(11, 15)];//getting random text for lazy state
                break;
                case "sad":
                  $scope.gametext = $scope.text[$scope.getRandomInt(16, 20)];//getting random text for sad state
                break;   
              };
              $scope.hint=$scope.text[$scope.getRandomInt(51, 55)];//random hint
              //active and inactive buttons
              $scope.ButtonsInverse();
              $scope.daycounter = $scope.daycounter + 1;  //counting days
      
        } //endelse         

    } //end main if
               
  
  };

  $scope.feedPika = function () {
    //checking if happines was restored
    if ( $scope.stateOfBeingSave2 == "hungry" ) {
        
        $scope.nothappy = false;
        $scope.happy = true;
        $scope.score = $scope.score + $scope.getRandomInt(75, 100); //getting large score

    }     
    if ( $scope.nothappy == true ) {
        $scope.score = $scope.score + $scope.getRandomInt(1, 5);//getting some score
        
        $scope.gameover = true;
    } 
    //saving
    $scope.stateOfBeingSave2 =  $scope.stateOfBeingSave;
    $scope.stateOfBeingSave =  $scope.stateOfBeing;
    //text and pikachu status updated
    $scope.stateOfBeing = "feed";
    $scope.gametext=$scope.text[$scope.getRandomInt(21, 25)];//getting random text for feed state";

    //active and inactive buttons
    $scope.Buttons();//setting the active and inactive buttons

    //$scope.daycounter = $scope.daycounter + 1;//counting days  
    //checking if the activity is correct
    if ($scope.stateOfBeingSave=="hungry") {
        $scope.happy = true;
        $scope.score = $scope.score + $scope.getRandomInt(75, 100); //getting score 
    
    } else {
     
        $scope.nothappy = true;
        $scope.nextkey = false;
        $scope.score = $scope.score + $scope.getRandomInt(1, 5);//getting some score
    }  


  }; 

  $scope.disciplinePika = function () {
    //checking if happines was restored
    if ( $scope.stateOfBeingSave2 == "angry" ) {
        $scope.score = $scope.score + $scope.getRandomInt(75, 100); //getting large score        
        $scope.nothappy = false;
        $scope.happy = true;

    }
    //gameover check      
   if ( $scope.nothappy) {
        
       $scope.gameover = true;
    }
    //saving
    $scope.stateOfBeingSave2 =  $scope.stateOfBeingSave;
    $scope.stateOfBeingSave =  $scope.stateOfBeing;
    //text and pikachu status updated
    $scope.stateOfBeing = "discipline";
    $scope.gametext=$scope.text[$scope.getRandomInt(26, 30)];//getting random text for discipline state";

    //active and inactive buttons
    $scope.Buttons();//setting the active and inactive buttons

    //$scope.daycounter = $scope.daycounter + 1;//counting days  
    //checking if the activity is correct
    if ($scope.stateOfBeingSave=="angry") {
        $scope.happy = true;
        $scope.score = $scope.score + $scope.getRandomInt(75, 100); //getting large score         
    
    } else {

        $scope.nothappy = true;
        $scope.nextkey = false;
        $scope.score = $scope.score + $scope.getRandomInt(1, 5);//getting some score
    }        
    
    
  };

  $scope.workoutPika = function () {
     //checking if happines was restored
    if ( $scope.stateOfBeingSave2 == "lazy" ) {
        $scope.score = $scope.score + $scope.getRandomInt(75, 100); //getting large score     
        $scope.nothappy = false;
        $scope.happy = true;

    }
   //gameover check       
   if ( $scope.nothappy) {
        
       $scope.gameover = true;
    }
    //saving
    $scope.stateOfBeingSave2 =  $scope.stateOfBeingSave;
    $scope.stateOfBeingSave =  $scope.stateOfBeing; 
    //text and pikachu status updated
    $scope.stateOfBeing = "workout";
    $scope.gametext=$scope.text[$scope.getRandomInt(31, 35)];//getting random text for workout state";
    //active and inactive buttons
    $scope.Buttons();//setting the active and inactive buttons
   
    //$scope.daycounter = $scope.daycounter + 1;//counting days  
    //checking if the activity is correct
    if ($scope.stateOfBeingSave=="lazy") {
        $scope.score = $scope.score + $scope.getRandomInt(75, 100); //getting large score
        $scope.happy = true; 
        
    } else {

        $scope.nothappy = true;
        $scope.nextkey = false;
        $scope.score = $scope.score + $scope.getRandomInt(1, 5);//getting some score
    }           
  };

  $scope.petPika = function () {
    //checking if happines was restored
    if ( $scope.stateOfBeingSave2 == "sad" ) {
        $scope.score = $scope.score + $scope.getRandomInt(75, 100); //getting large score       
        $scope.nothappy = false;
        $scope.happy = true;

    } 
    //gameover check   
   if ( $scope.nothappy) {
          
       $scope.gameover = true;
    }
    //saving
    $scope.stateOfBeingSave2 =  $scope.stateOfBeingSave;
    $scope.stateOfBeingSave =  $scope.stateOfBeing;
    //text and pikachu status updated          
    $scope.stateOfBeing = "pet";
    $scope.gametext=$scope.text[$scope.getRandomInt(36, 40)];//getting random text for pet state";
    //active and inactive buttons
    $scope.Buttons();//setting the active and inactive buttons
    //$scope.nextkey = false;
    //$scope.feedkey = true;
    //$scope.disciplinekey = true;
    //$scope.trainingkey = true;
    //$scope.petkey = true;
     
    //checking if the activity is correct
    if ($scope.stateOfBeingSave=="sad") {
        $scope.score = $scope.score + $scope.getRandomInt(75, 100); //getting large score
        $scope.happy = true; 
    
    } else {

        $scope.nothappy = true;
        $scope.nextkey = false;
        $scope.score = $scope.score + $scope.getRandomInt(1, 5);//getting some score
    }           
  };

  $scope.sayMessage = function () {
    return $scope.gametext;
  };

}

})();
