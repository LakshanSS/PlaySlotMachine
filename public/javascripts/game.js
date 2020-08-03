//Class Symbol
var Symbol = /** @class */ (function () {
    function Symbol(imgName, value) {
        this.imgURL = "/assets/images/" + imgName + ".png";
        this.value = value;
    }
    Symbol.prototype.setImage = function (imgName) {
        this.imgURL = "/assets/images/" + imgName + ".png";
    };
    Symbol.prototype.setValue = function (value) {
        this.value = value;
    };
    Symbol.prototype.getImage = function () {
        return this.imgURL;
    };
    Symbol.prototype.getValue = function () {
        return this.value;
    };
    //method to compare two Symbols
    Symbol.compareSymbols = function (sym1, sym2) {
        if (sym1.getImage() == sym2.getImage()) {
            return true;
        }
        else {
            return false;
        }
    };
    return Symbol;
}());
//Class Reel
var Reel = /** @class */ (function () {
    function Reel() {
        this.symbolList = [];
        this.spinning = false;
        this.symbolList.push(new Symbol("cherry", 2));
        this.symbolList.push(new Symbol("lemon", 3));
        this.symbolList.push(new Symbol("plum", 4));
        this.symbolList.push(new Symbol("watermelon", 6));
        this.symbolList.push(new Symbol("bell", 8));
        this.symbolList.push(new Symbol("redseven", 10));
    }
    Reel.prototype.getSymbolList = function () {
        return this.symbolList;
    };
    Reel.prototype.setCurrentSymbol = function (cs) {
        return this.currentSymbol = cs;
    };
    Reel.prototype.getCurrentSymbol = function () {
        return this.currentSymbol;
    };
    Reel.prototype.setSpinning = function (b) {
        this.spinning = b;
    };
    Reel.prototype.isSpinning = function () {
        return this.spinning;
    };
    return Reel;
}());
//Class SlotMachine
var SlotMachine = /** @class */ (function () {
    function SlotMachine() {
        this.credits = SlotMachine.INITIAL_CREDITS;
        this.addedCoins = 0;
        this.betCoins = 0;
        this.noOfWins = 0;
        this.noOfLosts = 0;
        this.areSpinning = false;
        this.reel1 = new Reel();
        this.reel2 = new Reel();
        this.reel3 = new Reel();
        this.s1Index = 0;
        this.s2Index = 2;
        this.s3Index = 5;
    }
    //Method to spin the first reel
    SlotMachine.prototype.spin1 = function () {
        document.getElementById("img1").src = (this.reel1.getSymbolList()[this.s1Index].getImage());
        this.reel1.setCurrentSymbol(this.reel1.getSymbolList()[this.s1Index]);
        this.s1Index++;
        if (this.s1Index == 6) {
            this.s1Index = 0;
        }
    };
    //Method to spin the second reel
    SlotMachine.prototype.spin2 = function () {
        document.getElementById("img2").src = (this.reel2.getSymbolList()[this.s2Index].getImage());
        this.reel2.setCurrentSymbol(this.reel2.getSymbolList()[this.s2Index]);
        this.s2Index++;
        if (this.s2Index == 6) {
            this.s2Index = 0;
        }
    };
    //Method to spin the third reel
    SlotMachine.prototype.spin3 = function () {
        document.getElementById("img3").src = (this.reel3.getSymbolList()[this.s3Index].getImage());
        this.reel3.setCurrentSymbol(this.reel3.getSymbolList()[this.s3Index]);
        this.s3Index++;
        if (this.s3Index == 6) {
            this.s3Index = 0;
        }
    };
    //Method to start spinning the reels
    SlotMachine.prototype.spinReels = function () {
        var _this = this;
        this.spinS1 = setInterval(function () { return _this.spin1(); }, 100);
        this.reel1.setSpinning(true);
        this.spinS2 = setInterval(function () { return _this.spin2(); }, 97);
        this.reel2.setSpinning(true);
        this.spinS3 = setInterval(function () { return _this.spin3(); }, 96);
        this.reel3.setSpinning(true);
        document.getElementById("msgBox").innerHTML = "Click a reel to stop!";
    };
    //Method to update the UI after change in the values
    SlotMachine.prototype.updateValues = function () {
        document.getElementById("displayCredit").innerHTML = "" + this.credits;
        document.getElementById("displayBet").innerHTML = "" + this.betCoins;
    };
    //Method to reset values
    SlotMachine.prototype.resetValues = function () {
        if (this.betCoins != 0) {
            this.credits += this.betCoins;
            this.betCoins = 0;
            this.updateValues();
        }
    };
    //Method to compare the symbols and update the result
    SlotMachine.prototype.updateResult = function () {
        if (!this.reel1.isSpinning() && (!this.reel2.isSpinning() && !this.reel1.isSpinning())) {
            if (Symbol.compareSymbols(this.reel1.getCurrentSymbol(), this.reel2.getCurrentSymbol()) ||
                Symbol.compareSymbols(this.reel1.getCurrentSymbol(), this.reel3.getCurrentSymbol())) {
                this.credits += this.betCoins * this.reel1.getCurrentSymbol().getValue();
                this.noOfWins++;
                winSnd.play();
                document.getElementById("msgBox").innerHTML = "You won! (" + this.betCoins * this.reel1.getCurrentSymbol().getValue() +
                    " Coins)";
                document.getElementById("msgBox").style.color = '#00fa9a';
            }
            else if (Symbol.compareSymbols(this.reel2.getCurrentSymbol(), this.reel3.getCurrentSymbol())) {
                this.credits += this.betCoins * this.reel2.getCurrentSymbol().getValue();
                this.noOfWins++;
                winSnd.play();
                document.getElementById("msgBox").innerHTML = "You won! (" + this.betCoins * this.reel2.getCurrentSymbol().getValue() +
                    " Coins)";
                document.getElementById("msgBox").style.color = '#00fa9a';
            }
            else {
                lostSnd.play();
                this.noOfLosts++;
                document.getElementById("msgBox").style.color = '#dc143c';
                document.getElementById("msgBox").innerHTML = "You lost!";
            }
            this.betCoins = 0;
            this.areSpinning = false;
            this.updateValues();
        }
    };
    SlotMachine.prototype.newGame = function () {
        newGameSnd.play();
        document.getElementById("msgBox").style.color = '#00fa9a';
        document.getElementById("msgBox").innerHTML = "New Game! Bet and Spin!";
        this.noOfWins = 0;
        this.noOfLosts = 0;
        this.betCoins = 0;
        this.addedCoins = 0;
        this.credits = SlotMachine.INITIAL_CREDITS;
        this.updateValues();
    };
    SlotMachine.INITIAL_CREDITS = 10;
    SlotMachine.MAX_BET = 3;
    return SlotMachine;
}());
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
function startGame() {
    //Event Listener for addCredit
    document.getElementById("addCredit").addEventListener("click", function () {
        if (!sm.areSpinning) {
            if (sm.credits < 1000) {
                addCoinSnd.play();
                sm.addedCoins++;
                sm.credits++;
                document.getElementById("displayCredit").innerHTML = "" + sm.credits;
            }
            else {
                document.getElementById("msgBox").style.color = '#dc143c';
                warningSnd.play();
                document.getElementById("msgBox").innerHTML = "Can't add more than 1000";
            }
        }
        else {
            document.getElementById("msgBox").style.color = '#dc143c';
            warningSnd.play();
            document.getElementById("msgBox").innerHTML = "Can't add coins while spinning";
        }
    });
    //Event Listener for betOne
    document.getElementById("betOne").addEventListener("click", function () {
        if (!sm.areSpinning) {
            if (sm.credits > 0) {
                sm.betCoins++;
                sm.credits--;
                sm.updateValues();
                betSnd.play();
                document.getElementById("msgBox").style.color = '#00fa9a';
                document.getElementById("msgBox").innerHTML = "You have bet One!";
            }
            else {
                warningSnd.play();
                document.getElementById("msgBox").innerHTML = "You don't have coins!";
                document.getElementById("msgBox").style.color = '#dc143c';
            }
        }
        else {
            warningSnd.play();
            document.getElementById("msgBox").style.color = '#dc143c';
            document.getElementById("msgBox").innerHTML = "Can't bet while spinning";
        }
    });
    //Event Listener for betMax
    document.getElementById("betMax").addEventListener("click", function () {
        if (!sm.areSpinning) {
            if (sm.credits + sm.betCoins >= SlotMachine.MAX_BET) {
                sm.resetValues();
                sm.betCoins += SlotMachine.MAX_BET;
                sm.credits -= SlotMachine.MAX_BET;
                sm.updateValues();
                betSnd.play();
                document.getElementById("msgBox").style.color = '#00fa9a';
                document.getElementById("msgBox").innerHTML = "You have bet Max!";
            }
            else {
                warningSnd.play();
                document.getElementById("msgBox").style.color = '#dc143c';
                document.getElementById("msgBox").innerHTML = "You don't have coins!";
            }
        }
        else {
            warningSnd.play();
            document.getElementById("msgBox").style.color = '#dc143c';
            document.getElementById("msgBox").innerHTML = "Can't bet while spinning";
        }
    });
    //Event Listener for reset
    document.getElementById("reset").addEventListener("click", function () {
        if (!sm.areSpinning) {
            if (sm.betCoins != 0) {
                sm.resetValues();
                resetSnd.play();
                document.getElementById("msgBox").style.color = '#00fa9a';
                document.getElementById("msgBox").innerHTML = "You have reset your bet!";
            }
        }
        else {
            warningSnd.play();
            document.getElementById("msgBox").style.color = '#dc143c';
            document.getElementById("msgBox").innerHTML = "Can't reset while spinning";
        }
    });
    //Event Listener for spin button
    document.getElementById("spinBtn").addEventListener("click", function () {
        if (!sm.areSpinning) {
            if (sm.betCoins > 0) {
                document.getElementById("msgBox").style.color = '#00fa9a';
                document.getElementById("msgBox").innerHTML = "Click a reel to stop!";
                spinSnd.play();
                sm.spinReels();
                sm.areSpinning = true;
            }
            else {
                warningSnd.play();
                document.getElementById("msgBox").style.color = '#dc143c';
                document.getElementById("msgBox").innerHTML = "Please bet before spinning!";
            }
        }
    });
    //Event Listener for slot1
    document.getElementById("img1").addEventListener("click", function () {
        if (sm.areSpinning) {
            clearInterval(sm.spinS1);
            sm.reel1.setSpinning(false);
            sm.updateResult();
        }
    });
    //Event Listener for slot2
    document.getElementById("img2").addEventListener("click", function () {
        if (sm.areSpinning) {
            clearInterval(sm.spinS2);
            sm.reel2.setSpinning(false);
            sm.updateResult();
        }
    });
    //Event Listener for slot3
    document.getElementById("img3").addEventListener("click", function () {
        if (sm.areSpinning) {
            clearInterval(sm.spinS3);
            sm.reel3.setSpinning(false);
            sm.updateResult();
        }
    });
    //Event Listener for newGame
    document.getElementById("newGame").addEventListener("click", function () {
        if (!sm.areSpinning) {
            sm.newGame();
        }
    });
    //Event Listener for payout
    document.getElementById("payout").addEventListener("click", function () {
        if (!sm.areSpinning) {
            alert("(P)of a winning combination = (1/6)*(1/6)= 0.027\n\n" +
                "Payout for 2xSeven = 0.027*10$ = 0.270$\n" +
                "Payout for 2xBell = 0.027*8$ = 0.216$\n" +
                "Payout for 2xWatermelon = 0.027*6$ = 0.162$\n" +
                "Payout for 2xPlum = 0.027*4$ = 0.108$\n" +
                "Payout for 2xLemon = 0.027*3$ = 0.081$\n" +
                "Payout for 2xCherry = 0.027*2$ = 0.054$\n\n" +
                "Total Payout for 1$ = 0.891$ (89.1%)");
        }
    });
    //Event Listener for statistics
    document.getElementById("statistics").addEventListener("click", function () {

        if (!sm.areSpinning) {
            var totalSpins = sm.noOfWins + sm.noOfLosts;
            var noOfWins = sm.noOfWins;
            var noOfLosts = sm.noOfLosts;
            var gainedCoins = sm.credits - (sm.addedCoins + SlotMachine.INITIAL_CREDITS);
            var avgPerSpin = (gainedCoins / totalSpins);
            document.getElementById("disSpins").innerHTML = "Total Spins: " + totalSpins;
            document.getElementById("disWins").innerHTML = "No Of Wins: " + noOfWins;
            document.getElementById("disLosts").innerHTML = "No Of Losts: " + noOfLosts;
            document.getElementById("disGain").innerHTML = "Gained Coins: " + gainedCoins;
            document.getElementById("disAvgPerSpin").innerHTML = "Avg per Spin: " + avgPerSpin;
            var pieChart = document.getElementById('pieChart');
            var color = ['rgb(14,195,141)', 'rgb(206, 5, 11)'];
            var data = [{
                    values: [sm.noOfWins, sm.noOfLosts],
                    labels: ['NoOfWins', 'noOfLosts'],
                    type: 'pie',
                    marker: {
                        colors: color
                    },
                    hoverinfo: 'label+percent'
                }];
            var layout = {
                height: 400,
                width: 400
            };
            Plotly.newPlot(pieChart, data, layout);
            document.getElementById("gameContainer").style.display = "none";
            document.getElementById("statisticsContainer").style.display = "";
        }

    });
    //Event Listener for back
    document.getElementById("back").addEventListener("click", function () {
        document.getElementById("statisticsContainer").style.display = "none";
        document.getElementById("gameContainer").style.display = "";
    });
    //Event Listener for save
    document.getElementById("saveStatistics").addEventListener("click", function () {
        var playerName = document.getElementById("playerName").value;
        var playerEmail = document.getElementById("playerEmail").value;
        var totalSpins = sm.noOfWins + sm.noOfLosts;
        var noOfWins = sm.noOfWins;
        var noOfLosts = sm.noOfLosts;
        var gainedCoins = sm.credits - (sm.addedCoins + SlotMachine.INITIAL_CREDITS);
        var avgPerSpin = (gainedCoins / totalSpins);
        var database = firebase.database().ref();
        var playerRef = database.push();
        playerRef.set({
            name: playerName,
            email: playerEmail,
            totalSpins: totalSpins,
            wins: noOfWins,
            losts: noOfLosts,
            gain: gainedCoins,
            avgPerSpin: avgPerSpin
        });
        sm.newGame();
        document.getElementById("playerName").value = "";
        document.getElementById("playerEmail").value = "";
        document.getElementById("statisticsContainer").style.display = "none";
        document.getElementById("gameContainer").style.display = "";
    });
}
//Creating an instance of a SlotMachine
var sm = new SlotMachine();
//Start the game
startGame();
