import React from 'react';
const axios = require('axios');

class IsPidgeon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      model: null,
      confidence: null,
      imgUrl: '',
      isPidgeon: null,
      name: '',
      loaded: false,
      tested: false,
      saved: false,
    };
    this.imgRef = React.createRef();
    this.isPidgeonTest = this.isPidgeonTest.bind(this);
  }

  isPidgeonTest(image, imgUrl, name) {
    event.preventDefault();
    //This function tests an image to see if it is a pidgeon.
    this.props.model.classify(image.current)
      .then(predictions => {
        console.log(predictions[0].className === 'partridge' ? 'This is a Pidgeon' : 'This is not a Pidgeon');
        console.log(predictions[0].className === 'partridge' ? 'Pidgeon Confidence: ' + predictions[0].probability : '');
        //Yes I know a partridge is not a pidgeon,
        //but I keep feeding the model Pidgeons and they keep coming out as partridges???
        let result = predictions[0].className === 'partridge' ? true : false;
        this.setState({
          isPidgeon: result,
          confidence: predictions[0].probability,
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleTyping(e) {
    let target = e.target.name;
    if(target === 'birdName') {this.setState({name: e.target.value})}
    if(target === 'url') {this.setState({imgUrl: e.target.value})}
  }

  clearInputs( ){
    this.setState({
      imgUrl: '',
      name: ''
    })
  }

  addBird(bird) {
    axios.post('http://localhost:3000/api/tests', bird)
      .then(results => console.log('successly added to db', results))
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div>
          <h1>Is this a Pidgeon?</h1>

          <input
            name="url"
            type="text"
            onChange={(e) => {this.handleTyping(e)}}
            placeholder="Insert Your URL Here">
          </input>
          <button onClick={() => this.setState({loaded: true})}>Go!</button>

          {this.state.imgUrl.length > 0 && this.state.loaded ?
          <div>
            <div className="img-wrapper">
            <img
              src={this.state.imgUrl}
              ref={this.imgRef}
              alt="bird(?)"
              crossOrigin='anonymous'
              className="img"
              />
            </div>
            <button onClick={() => {
              this.isPidgeonTest(this.imgRef)
              this.setState({ tested: true })
            }}>
            Test
            </button>
          </div>
            : <></>}

          {this.state.tested ?
          <div>
            <input
            name="birdName"
            type="text"
            onChange={(e) => {this.handleTyping(e)}}
            placeholder="Name bird to save">
            </input>
            <button onClick={() => {
              this.props.addBird({
              name: this.state.name,
              url: this.state.imgUrl,
              isPigdeon: this.state.isPidgeon,
              confidence: this.state.confidence,
              isLiked: false,
             });
             this.setState({
               saved: true,
             })
            }}>Save!</button>
          </div>
          : <></>}

          {this.state.saved ?
          <div>
            <h3> Noice! Your Birb Has Been Saved! </h3>
          </div>
          : <></>}
      </div>
    );
  }

}

export default IsPidgeon;