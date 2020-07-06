import React, { Component, useState } from 'react'
import {  Progress } from 'semantic-ui-react'

function ProgressBar(props) {
  const [state, setState] = useState(props);
 
  return (
    <div>
      <Progress percent={state.percentage} indicating />
    </div>
  )
}
 
export default ProgressBar;