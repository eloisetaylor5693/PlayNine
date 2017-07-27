import React, { Component } from 'react';

class NumbersFrame extends Component {
  render() {
    var numbers = [], className,
        selectNumber = this.props.selectNumber,
        usedNumbers = this.props.usedNumbers,
        selectedNumbers = this.props.selectedNumbers;

    for (var i=1; i <= 9; i++) {
      className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
      className += " used-" + (usedNumbers.indexOf(i)>=0);
      numbers.push(
        <div className={className} onClick={selectNumber.bind(null, i)} key={i.toString()}>
          {i}
        </div>
      );
    }
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
}

export default NumbersFrame;