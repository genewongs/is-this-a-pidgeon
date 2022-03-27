import React from 'react';
import BirdEntry from './BirdEntry.jsx';

class BirdList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <div>
        <h1>Pidgeon Tests</h1>
          <div className="bird-list">
            {this.props.birds.map((bird,index) => {
              return <BirdEntry
                key={index}
                bird={bird}
                deleteBird={this.props.deleteBird}
                updateStatus={this.props.updateStatus}
                updateName={this.props.updateName}
                likeBird={this.props.likeBird}
              />
            })}
          </div>
      </div>
    )
  }
}

export default BirdList;