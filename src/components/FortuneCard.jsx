import React from 'react'

const FortuneCard = ({ fortune }) => {
   return (
      <div className="fortune-card-div">
         <h3>{fortune.text}</h3>
         <p>{fortune.userAdded && 'Submitted by a user' }</p>
      </div>
   )
}

export default FortuneCard
