import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      rotate: 1,
      newWidth: 200,
      newHeight: 200
    }
  }

  loadImage(event){
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      this.setState({ imageUrl: reader.result })
   }
  }
  resizerImage(value){
    let Image = document.getElementById('image')
    this.setState({
      newWidth: Image.width * value,
      newHeight: Image.height * value
    });
  }
  render() {
    return (
      <div className="App">
        <div className='image'>
          <img style={{width: this.state.newWidth, height: this.state.newHeight}} id='image' src={this.state.imageUrl}/>
        </div>
        <div className='controll'>
          <form  id='get-file'>
            <input onChange={event => this.loadImage(event)} type='file'/>
          </form>
          <div>
            <button onClick={() => this.resizerImage(2)}>+</button>
            <button onClick={() => this.resizerImage(0.5)}>-</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
