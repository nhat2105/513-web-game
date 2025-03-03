import React from 'react';

const Card = ({ id, value, isClicked, onClickF, matched }) =>  {


  return(
    <div onClick={onClickF} 

    style={{ display: matched ? 'none' : 'block',
    backgroundColor: isClicked ? 'cyan' : 'white',
    borderRadius: 30, justifyItems: 'center', 
    borderColor: 'black', borderWidth: 2, borderStyle: 'solid'}}>
      {isClicked ? <h2>{value}</h2> : <h2>?</h2>}
    </div>
  )  
}

export default Card;
