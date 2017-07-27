import React, { Component } from 'react';
import AnswerFrame from './Frames/AnswersFrame';
import ButtonFrame from './Frames/ButtonFrame';
import DoneFrame from './Frames/DoneFrame';
import NumbersFrame from './Frames/NumbersFrame';
import StarsFrame from './Frames/StarsFrame';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.randomNumber = this.randomNumber.bind(this);
    this.sumOfSelectedNumbers = this.sumOfSelectedNumbers.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
    this.possibleCombinationSum = this.possibleCombinationSum.bind(this);
    this.possibleSolution = this.possibleSolution.bind(this);
    this.updateDoneStatus = this.updateDoneStatus.bind(this);
  }

  getInitialState() {
    return { numberOfStars: this.randomNumber(),
             selectedNumbers: [],
             usedNumbers: [],
             redraws: 5,
             correct: null,
             doneStatus: null };
  }
  resetGame() {
    this.replaceState(this.getInitialState());
  }
  randomNumber() {
    return Math.floor(Math.random()*9) + 1
  }
  selectNumber(clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
      this.setState(
        { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
          correct: null }
      );
    }
  }
  unselectNumber(clickedNumber) {
    var selectedNumbers = this.state.selectedNumbers,
        indexOfNumber = selectedNumbers.indexOf(clickedNumber);

    selectedNumbers.splice(indexOfNumber, 1);

    this.setState({ selectedNumbers: selectedNumbers, correct: null });
  }
  sumOfSelectedNumbers() {
    return this.state.selectedNumbers.reduce(function(p,n) {
      return p+n;
    }, 0)
  }
  checkAnswer() {
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState({ correct: correct });
  }
  acceptAnswer() {
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: this.randomNumber()
    }, function() {
      this.updateDoneStatus();
    });
  }
  redraw() {
    if (this.state.redraws > 0) {
      this.setState({
        numberOfStars: this.randomNumber(),
        correct: null,
        selectedNumbers: [],
        redraws: this.state.redraws - 1
      }, function() {
        this.updateDoneStatus();
      });
    }
  }
  possibleSolution() {
    var numberOfStars = this.state.numberOfStars,
        possibleNumbers = [],
        usedNumbers = this.state.usedNumbers;

    for (var i=1; i<=9; i++) {
      if (usedNumbers.indexOf(i) < 0) {
        possibleNumbers.push(i);
      }
    }

    return this.possibleCombinationSum(possibleNumbers, numberOfStars);
  }
  updateDoneStatus() {
    if (this.state.usedNumbers.length === 9) {
      this.setState({ doneStatus: 'You won at life by winning this game!' });
      return;
    }
    if (this.state.redraws ===0 && !this.possibleSolution()) {
      this.setState({ doneStatus: 'You lost! Game Over!' });
    }
  } 
  possibleCombinationSum (arr, n){
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return this.possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };
  
  render() {
    var selectedNumbers = this.state.selectedNumbers,
        usedNumbers = this.state.usedNumbers,
        numberOfStars = this.state.numberOfStars,
        redraws = this.state.redraws,
        correct = this.state.correct,
        doneStatus = this.state.doneStatus,
        bottomFrame;

    if (doneStatus) {
      bottomFrame = <DoneFrame doneStatus={doneStatus}
                               resetGame={this.resetGame} />;
    } else {
      bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers}
                      usedNumbers={usedNumbers}
                      selectNumber={this.selectNumber} />;
    }

    return (
      <div className="container">
        <div id="game">
          <h2>Play Nine</h2>
          <hr />
          <div className="clearfix">
            <StarsFrame numberOfStars={numberOfStars} />
            <ButtonFrame selectedNumbers={selectedNumbers}
                        correct={correct}
                        redraws={redraws}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw} />
            <AnswerFrame selectedNumbers={selectedNumbers}
                        unselectNumber={this.unselectNumber} />
          </div>

          {bottomFrame}

        </div>
      </div>
    );
  }
}

export default Game;