import React, { Component } from 'react'
import {  Progress } from 'semantic-ui-react'



class ProgressBar extends Component {
 constructor(state){
     super()
     this.state = state
 }


  render() {
    return (
      <div>
        <Progress percent={this.state.percentage} indicating />
      </div>
    )
  }
}

export default ProgressBar;
