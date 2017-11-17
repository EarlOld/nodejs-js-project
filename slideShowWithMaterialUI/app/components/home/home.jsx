import './home.styl'
import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      open: false
    }
  }
  hendleInputChenge (e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.setState({
        items: this.state.items.concat(URL.createObjectURL(e.target.files[i]))
      })
      e.target.files[i]
    }
    this.setState({
      open: true
    })
  }
  handleRequestClose () {
    this.setState({ open: false })
  }

  render () {
    const classes = {
      button: {
        margin: '20px'
      },
      input: {
        display: 'none'
      }
    }

    console.log(this.state.items);
    return (
      <div id='home'>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Typography type='title' color='inherit'>
              Слайд шоу
            </Typography>
          </Toolbar>
        </AppBar>
        <div className='main'>
          <div className='main-item'>
            <p>Будь ласка  натисніть на конопку аби вибрати картинки для слайд-шоу</p>

            <input base64 onChange={e => this.hendleInputChenge(e)} accept='jpg,jpeg,JPG,JPEG' style={classes.input} id='file' multiple type='file' />
            <label htmlFor='file'>
              <Button raised component='span' className='main-item-button'>
                Upload
              </Button>
            </label>
          </div>
        </div>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{"Ваші  фото"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.items.map((item, index) => {
                return (
                  <div style={{display: 'flex'}}>
                    <img style={{width: '100px', height: '100px'}} src={item} />
                    <p>{item}</p>
                  </div>
                )
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleRequestClose()} color="primary">
              Disagree
            </Button>
            <Button onClick={() => this.handleRequestClose()} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default Home
