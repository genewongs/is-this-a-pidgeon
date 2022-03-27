import React from 'react';

const BirdEntry = ({ bird, deleteBird, updateStatus, updateName, likeBird }) => (
  <div className="entry">
  <div className="entry-image-wrapper">
      <img className="entry-image" src={bird.url} alt="bird(?)"/>
    </div>
    <div className="entry-text">
      <div className="entry-name">
        <h3 onDoubleClick={() => {updateName(bird)}}>{bird.name}</h3>
      </div>
      <div className="entry-category">
        <h4>{bird.isPidgeon}</h4>
      </div>

      <button onClick={() => {updateStatus(bird)}}>This Pidgeon is {Boolean(bird.isPigdeon) ? 'real' : 'fake af'}   </button>

      {bird.isPigdeon ? <button onClick={() => {likeBird(bird)}}>I love this bird</button> : ''}
      <br></br>
      <button onClick={() => {deleteBird(bird)}}>Delete This Bird</button> <br></br>

    </div>
  </div>
)

export default BirdEntry;