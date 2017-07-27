import React, { Component } from 'react';

class StarsFrame extends Component {
  render() {
    var stars = [];
    for (var i =0; i < this.props.numberOfStars; i++) {
      stars.push(
        <span className="glyphicon glyphicon-star" key={i.toString()}></span>
      );
    }

    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
}

export default StarsFrame;