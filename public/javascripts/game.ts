//Interface ISymbol
interface ISymbol{
  setImage:(string)=>void,
  setValue:(number)=>void,
  getImage:()=>string,
  getValue:()=>number
}

//Class Symbol
class Symbol implements ISymbol{
  private imgURL:string;
  private value:number;
  constructor(imgName:string,value:number){
    this.imgURL = "/assets/images/"+imgName+".png";
    this.value = value;
  }
  setImage(imgName:string){
    this.imgURL = "/assets/images/"+imgName+".png";
  }
  setValue(value:number){
    this.value = value;
  }
  getImage(){
    return this.imgURL;
  }
  getValue(){
    return this.value;
  }
  //method to compare two Symbols
  static compareSymbols(sym1:Symbol,sym2:Symbol){
    if(sym1.getImage()==sym2.getImage()){
      return true;
    }else{
      return false;
    }
  }

}

//Class Reel
class Reel{
  private symbolList:Symbol[]=[];
  private currentSymbol:Symbol;
  private spinning:boolean=false;
  constructor(){
      this.symbolList.push(new Symbol("cherry",2));
      this.symbolList.push(new Symbol("lemon",3));
      this.symbolList.push(new Symbol("plum",4));
      this.symbolList.push(new Symbol("watermelon",6));
      this.symbolList.push(new Symbol("bell",8));
      this.symbolList.push(new Symbol("redseven",10));
  }


  getSymbolList(){
    return this.symbolList;
  }

  setCurrentSymbol(cs:Symbol){
    return this.currentSymbol=cs;
  }

  getCurrentSymbol(){
    return this.currentSymbol;
  }

  setSpinning(b:boolean){
    this.spinning = b;
  }

  isSpinning(){
    return this.spinning;
  }

}

//Class SlotMachine
class SlotMachine{
  public static INITIAL_CREDITS:number=10;
  public static MAX_BET:number=3;
  credits:number =SlotMachine.INITIAL_CREDITS;
  addedCoins:number=0;
  betCoins:number=0;
  noOfWins:number=0;
  noOfLosts:number=0;
  areSpinning:boolean=false;
  reel1:Reel=new Reel();
  reel2:Reel=new Reel();
  reel3:Reel=new Reel();
  s1Index:number=0;
  s2Index:number=2;
  s3Index:number=5;
  spinS1:number;
  spinS2:number;
  spinS3:number;///break point
    //Method to spin the first reel
   spin1(){
    document.getElementById("img1").src = (this.reel1.getSymbolList()[this.s1Index].getImage());
    this.reel1.setCurrentSymbol(this.reel1.getSymbolList()[this.s1Index]);
    this.s1Index++;
    if(this.s1Index==6){
      this.s1Index=0;
    }

  }
  //Method to spin the second reel
   spin2(){
    document.getElementById("img2").src = (this.reel2.getSymbolList()[this.s2Index].getImage());
    this.reel2.setCurrentSymbol(this.reel2.getSymbolList()[this.s2Index]);
    this.s2Index++;
    if(this.s2Index==6){
      this.s2Index=0;
    }

  }
  //Method to spin the third reel
   spin3(){
    document.getElementById("img3").src = (this.reel3.getSymbolList()[this.s3Index].getImage());

    this.reel3.setCurrentSymbol(this.reel3.getSymbolList()[this.s3Index]);

    this.s3Index++;
    if(this.s3Index==6){
      this.s3Index=0;
    }

  }
  //Method to start spinning the reels
  spinReels(){
      this.spinS1=setInterval(() =>this.spin1(),100);
      this.reel1.setSpinning(true);
      this.spinS2=setInterval(() =>this.spin2(),97);
      this.reel2.setSpinning(true);
      this.spinS3=setInterval(() =>this.spin3(),96);
      this.reel3.setSpinning(true);
      document.getElementById("msgBox").innerHTML = "Click a reel to stop!";
  }
  //Method to update the UI after change in the values
  updateValues(){
    document.getElementById("displayCredit").innerHTML=""+this.credits;
    document.getElementById("displayBet").innerHTML=""+this.betCoins;
  }

  //Method to reset values
  resetValues(){
    if(this.betCoins!=0){
      this.credits+=this.betCoins;
      this.betCoins=0;
      this.updateValues();

    }
  }

  //Method to compare the symbols and update the result
  updateResult(){
    if(!this.reel1.isSpinning() && (!this.reel2.isSpinning() && !this.reel1.isSpinning())){
      if(Symbol.compareSymbols(this.reel1.getCurrentSymbol(),this.reel2.getCurrentSymbol())||
    Symbol.compareSymbols(this.reel1.getCurrentSymbol(),this.reel3.getCurrentSymbol())){
        this.credits += this.betCoins*this.reel1.getCurrentSymbol().getValue();
        this.noOfWins++;
        winSnd.play();
        document.getElementById("msgBox").innerHTML = "You won! ("+this.betCoins*this.reel1.getCurrentSymbol().getValue()+
        " Coins)";
        document.getElementById("msgBox").style.color='#00fa9a';
      }else if(Symbol.compareSymbols(this.reel2.getCurrentSymbol(),this.reel3.getCurrentSymbol())){
        this.credits += this.betCoins*this.reel2.getCurrentSymbol().getValue();
        this.noOfWins++;
        winSnd.play();
        document.getElementById("msgBox").innerHTML = "You won! ("+this.betCoins*this.reel2.getCurrentSymbol().getValue()+
        " Coins)";
        document.getElementById("msgBox").style.color='#00fa9a';
      }else{
        lostSnd.play();
        this.noOfLosts++;
        document.getElementById("msgBox").style.color='#dc143c';
        document.getElementById("msgBox").innerHTML = "You lost!"
      }
      this.betCoins=0;
      this.areSpinning=false;
      this.updateValues();

    }
  }

  newGame(){
    newGameSnd.play();
    document.getElementById("msgBox").style.color='#00fa9a';
    document.getElementById("msgBox").innerHTML = "New Game! Bet and Spin!"
    this.noOfWins=0;
    this.noOfLosts=0;
    this.betCoins=0;
    this.addedCoins=0;
    this.credits=SlotMachine.INITIAL_CREDITS;
    this.updateValues();
  }


}


//Load the audio files
var warningSnd = new Audio("/assets/audio/warning.mp3");
var spinSnd = new Audio("/assets/audio/spin.mp3");
var addCoinSnd = new Audio("/assets/audio/addcoin.wav");
var lostSnd = new Audio("/assets/audio/lost.wav");
var winSnd = new Audio("/assets/audio/win.wav");
var newGameSnd = new Audio("/assets/audio/newgame.wav");
var resetSnd = new Audio("/assets/audio/reset.wav");
var betSnd = new Audio("/assets/audio/bet.wav");


//Method to start the game
function startGame(){
  //Event Listener for addCredit
  document.getElementById("addCredit").addEventListener("click", function(){
    if(!sm.areSpinning){
        if(sm.credits<1000){
          addCoinSnd.play();
          sm.addedCoins++;
          sm.credits++;
          document.getElementById("displayCredit").innerHTML=""+sm.credits;
        }else{
          document.getElementById("msgBox").style.color='#dc143c';
          warningSnd.play();
          document.getElementById("msgBox").innerHTML="Can't add more than 1000";
        }
    }else{
      document.getElementById("msgBox").style.color='#dc143c';
      warningSnd.play();
      document.getElementById("msgBox").innerHTML="Can't add coins while spinning";
    }
    });

  //Event Listener for betOne
  document.getElementById("betOne").addEventListener("click", function(){
      if(!sm.areSpinning){
          if(sm.credits>0){
            sm.betCoins++;
            sm.credits--;
            sm.updateValues();
            betSnd.play();
            document.getElementById("msgBox").style.color='#00fa9a';
            document.getElementById("msgBox").innerHTML="You have bet One!";
          }else{
            warningSnd.play();
            document.getElementById("msgBox").innerHTML="You don't have coins!";
            document.getElementById("msgBox").style.color='#dc143c';
          }
      }else{
        warningSnd.play();
        document.getElementById("msgBox").style.color='#dc143c';
        document.getElementById("msgBox").innerHTML="Can't bet while spinning";
      }
      });
  //Event Listener for betMax
      document.getElementById("betMax").addEventListener("click", function(){
        if(!sm.areSpinning){
            if(sm.credits+sm.betCoins >= SlotMachine.MAX_BET){
              sm.resetValues();
              sm.betCoins+=SlotMachine.MAX_BET;
              sm.credits-=SlotMachine.MAX_BET;
              sm.updateValues();
              betSnd.play();
              document.getElementById("msgBox").style.color='#00fa9a';
              document.getElementById("msgBox").innerHTML="You have bet Max!";
            }else{
              warningSnd.play();
              document.getElementById("msgBox").style.color='#dc143c';
              document.getElementById("msgBox").innerHTML="You don't have coins!";
            }
        }else{
          warningSnd.play();
          document.getElementById("msgBox").style.color='#dc143c';
          document.getElementById("msgBox").innerHTML="Can't bet while spinning";
        }
        });

  //Event Listener for reset
        document.getElementById("reset").addEventListener("click", function(){
          if(!sm.areSpinning){
              if(sm.betCoins!=0){
                sm.resetValues();
                resetSnd.play();
                document.getElementById("msgBox").style.color='#00fa9a';
                document.getElementById("msgBox").innerHTML="You have reset your bet!";
              }
          }else{
            warningSnd.play();
            document.getElementById("msgBox").style.color='#dc143c';
            document.getElementById("msgBox").innerHTML="Can't reset while spinning";
          }
          });

          //Event Listener for spin button
          document.getElementById("spinBtn").addEventListener("click", function () {
              if (!sm.areSpinning) {
                  if (sm.betCoins > 0) {
                    document.getElementById("msgBox").style.color='#00fa9a';
                      document.getElementById("msgBox").innerHTML = "Click a reel to stop!";
                      spinSnd.play();
                      sm.spinReels();
                      sm.areSpinning=true;
                  }else{
                    warningSnd.play();
                      document.getElementById("msgBox").style.color='#dc143c';
                      document.getElementById("msgBox").innerHTML = "Please bet before spinning!";

                  }
              }
          });

            //Event Listener for slot1
            document.getElementById("img1").addEventListener("click", function () {
            if(sm.areSpinning){
                clearInterval(sm.spinS1);
                sm.reel1.setSpinning(false);
                sm.updateResult();
              }
            });

            //Event Listener for slot2
            document.getElementById("img2").addEventListener("click", function () {
            if(sm.areSpinning){
                clearInterval(sm.spinS2);
                sm.reel2.setSpinning(false);
                sm.updateResult();
              }
            });

            //Event Listener for slot3
            document.getElementById("img3").addEventListener("click", function () {
            if(sm.areSpinning){
                clearInterval(sm.spinS3);
                sm.reel3.setSpinning(false);
                sm.updateResult();
              }
            });

            //Event Listener for newGame
            document.getElementById("newGame").addEventListener("click",function(){
            if(!sm.areSpinning){
              sm.newGame();
            }
          });
          //Event Listener for payout
          document.getElementById("payout").addEventListener("click",function(){
          if(!sm.areSpinning){
            alert("(P)of a winning combination = (1/6)*(1/6)= 0.027\n\n"+
          "Payout for 2xSeven = 0.027*10$ = 0.270$\n"+
          "Payout for 2xBell = 0.027*8$ = 0.216$\n"+
          "Payout for 2xWatermelon = 0.027*6$ = 0.162$\n"+
          "Payout for 2xPlum = 0.027*4$ = 0.108$\n"+
          "Payout for 2xLemon = 0.027*3$ = 0.081$\n"+
          "Payout for 2xCherry = 0.027*2$ = 0.054$\n\n"+
          "Total Payout for 1$ = 0.891$ (89.1%)");
          }
        });

          //Event Listener for statistics
          document.getElementById("statistics").addEventListener("click",function(){
          if(!sm.areSpinning){
            var totalSpins = sm.noOfWins+sm.noOfLosts;
            var noOfWins = sm.noOfWins;
            var noOfLosts = sm.noOfLosts;
            var gainedCoins = sm.credits-(sm.addedCoins+SlotMachine.INITIAL_CREDITS);
            var avgPerSpin = (gainedCoins/totalSpins);
            document.getElementById("disSpins").innerHTML="Total Spins: "+totalSpins;
            document.getElementById("disWins").innerHTML="No Of Wins: "+noOfWins;
            document.getElementById("disLosts").innerHTML="No Of Losts: "+noOfLosts;
            document.getElementById("disGain").innerHTML="Gained Coins: "+gainedCoins;
            document.getElementById("disAvgPerSpin").innerHTML="Avg per Spin: "+avgPerSpin;

            var pieChart = document.getElementById('pieChart');
            var color = ['rgb(14,195,141)', 'rgb(206, 5, 11)'];
            var data = [{
              values: [sm.noOfWins,sm.noOfLosts],
              labels: ['NoOfWins','noOfLosts'],
              type:'pie',
              marker:{
                colors:color
              },
              hoverinfo: 'label+percent'
            }];
            var layout = {
              height:400,
              width:400
            };

            Plotly.newPlot(pieChart, data, layout);

            document.getElementById("gameContainer").style.display="none";
            document.getElementById("statisticsContainer").style.display="";

          }
        });
        //Event Listener for back
        document.getElementById("back").addEventListener("click",function(){
        document.getElementById("statisticsContainer").style.display="none";
        document.getElementById("gameContainer").style.display="";
      });
      //Event Listener for save
      document.getElementById("saveStatistics").addEventListener("click",function(){
      var playerName = document.getElementById("playerName").value;
      var playerEmail = document.getElementById("playerEmail").value;
      var totalSpins = sm.noOfWins+sm.noOfLosts;
      var noOfWins = sm.noOfWins;
      var noOfLosts = sm.noOfLosts;
      var gainedCoins = sm.credits-(sm.addedCoins+SlotMachine.INITIAL_CREDITS);
      var avgPerSpin = (gainedCoins/totalSpins);

      var database = firebase.database().ref();
      var playerRef = database.push();
        playerRef.set({
        name: playerName,
        email: playerEmail,
        totalSpins:totalSpins,
        wins: noOfWins,
        losts: noOfLosts,
        gain: gainedCoins,
        avgPerSpin: avgPerSpin
      });
      sm.newGame();
      document.getElementById("playerName").value="";
      document.getElementById("playerEmail").value="";
      document.getElementById("statisticsContainer").style.display="none";
      document.getElementById("gameContainer").style.display="";
    });
}

//Creating an instance of a SlotMachine
let sm = new SlotMachine();

//Start the game
startGame();
