import React from 'react'

function Track(props) {
  return (
    <div className="records">
        <div className="recordsinfo">
            <div className="bold">Least Rolls:</div>
            <div>{props.score ? props.score : 0 }</div>
        </div>
        <div className="recordsinfo">
            <div className="bold">Current Rolls:</div>
            <div>{props.trys}</div>
        </div>
    </div>
  )
}

export default Track
