const mobilenet = require('@tensorflow-models/mobilenet');
import React, {useRef} from 'react';
import '@tensorflow/tfjs-backend-webgl';
import ModelLoadState from './components/ModelLoadState.jsx';
import IsPidgeon from './components/IsPidgeon.jsx';
import BirdList from './components/BirdList.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      model: null,
      imgUrl: null,
      birds: [],
      page: null,
    };
    this.imgRef = React.createRef();

    this.pageRouter = this.pageRouter.bind(this);
    this.deleteBird = this.deleteBird.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateName = this.updateName.bind(this);
    this.likeBird = this.likeBird.bind(this);
    this.addBird = this.addBird.bind(this);
  }

  componentDidMount() {
    //This loads the machine learning model.
    mobilenet.load()
      .then(model => {
        this.setState({model});
      })
    this.getBirds();
  }

  getBirds() {
    axios.get('http://localhost:3000/api/tests')
      .then(response => {
        if(response.status === 200) {
          this.setState({
            birds: response.data,
          });
        }
      })
      .catch(err => console.log(err));
  }

  pageRouter(){
    if(this.state.page === 'BirdList') {
      return <BirdList
        birds={this.state.birds}
        deleteBird={this.deleteBird}
        updateStatus={this.updateStatus}
        updateName={this.updateName}
        likeBird={this.likeBird}
      />
    } else if (this.state.page === 'isPidgeon') {
      return <IsPidgeon model={this.state.model} addBird={this.addBird}/>
    } else {
      return <></>
    }
  }

  updateStatus(bird) {
    axios.patch('http://localhost:3000/api/tests/status', bird)
      .then(res => {
        console.log(res)
        if(res.status === 200){
          this.getBirds();
        }
      })
      .catch(err => console.log(err));
  }

  updateName(bird) {
    let newName= prompt('Change Name');
    if(newName.length !== 0) {
      axios.patch('http://localhost:3000/api/tests/name', {
        url: bird.url,
        name: newName
      })
      .then(response => {
        if(response.status === 200) {
          this.getBirds();
        }
      });
    }
  }

  likeBird(bird) {
    axios.patch('http://localhost:3000/api/tests/like', bird)
      .then(res => {
        console.log(res)
        if(res.status === 200){
          this.getBirds();
        }
      })
      .catch(err => console.log(err));
  }

  addBird(bird) {
    axios.post('http://localhost:3000/api/tests', bird)
      .then(results => {
      if(results.status === 200) {
        this.getBirds();
      }
    })
      .catch(err => console.log(err));
  }

  deleteBird(bird) {
    axios.delete('http://localhost:3000/api/tests', {data : bird})
      .then(res => {
        if(res.status === 200){
          this.getBirds();
        }
      })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <div>
        <div className="navBar">
          <div className="nav">
          <span className="title">
            <img src="https://i.imgur.com/eXPeS9m.gif" height='100px'/>
            <span className="title-text">
              <h3>Is this a Pidgeon?</h3>
            </span>
            <span className="nav-button">
            |
            </span>
            <span onClick={() => {this.setState({page: 'isPidgeon'})}} className="nav-button">
              Pidgeon Tester
            </span>
            <span className="nav-button">
            |
            </span>
            <span onClick={() => {this.setState({page: 'BirdList'})}} className="nav-button">
              Show Me My Birds
            </span>
          </span>
          </div>
          <ModelLoadState model={this.state.model}/>
        </div>
        <div className="content">
          {this.pageRouter()}
        </div>
      </div>

    );
  }
}

export default App;