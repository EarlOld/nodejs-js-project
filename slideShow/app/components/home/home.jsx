import './home.styl'
import Snap from 'snapsvg'
import React, { Component } from 'react'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: true,
      line: [],
      draw: null,
      strokeCircleColor: '',
      isClicked: true
    }
  }
  componentDidMount () {
    let draw = Snap('#draw')
    let loadingCircle = draw.circle(97.3, 99.3, 50).attr({ stroke: '#123456', 'strokeWidth': 20, fill: 'none' }).addClass('circle');
    let circumf = Math.PI * (loadingCircle.attr('r') * 2)

    loadingCircle.animate({ transform: 's0 0' }, 1, mina.bounce)
    loadingCircle.attr({
      'stroke-dasharray': circumf + ' ' + circumf,
      'stroke-dashoffset': circumf
    })
    console.log(circumf)
    let g = draw.select('#items')
    g.animate({ transform: 's0 0' }, 1, mina.bounce)
    this.setState({draw})
    // draw.mouselive(event => {
    //   console.log(event);
    //   draw.circle(event.clientX, event.clientY, 1)
    // })

  }
  menuClickHandler () {
    if (this.state.isClicked) {
      this.setState({isClicked: false})
      let loadingCircle = this.state.draw.select('.circle')
      let circumf = Math.PI * (loadingCircle.attr('r') * 2)
      this.state.draw.select('#items').animate({ transform: 's1 1' }, 1500, mina.elastic )
      loadingCircle.animate({ transform: 's0 0' }, 1000, mina.elastic, () => {
        this.setState({isClicked: false})
      })
      loadingCircle.attr({ 'stroke-dashoffset': circumf })
    }
  }

  setStrokeColorSircle (event) {
    this.setState({isClicked: false})
    let strokeCircle
    switch (event.target.className.animVal) {
    case 'st0':
      strokeCircle = '#E2E2E2'
      break
    case 'st1':
      strokeCircle = '#1FE9FF'
      break
    case 'st2':
      strokeCircle = '#44FF55'
      break
    case 'st3':
      strokeCircle = '#DF1200'
      break
    case 'st4':
      strokeCircle = '#FF755F'
      break
    case 'st5':
      strokeCircle = '#1D00BA'
      break
    default:
      break
    }
    let loadingCircle = this.state.draw.select('.circle').attr({stroke: strokeCircle})
    let circumf = Math.PI * (loadingCircle.attr('r') * 2)

    this.state.draw.select('#items').animate({ transform: 's0 0' }, 100, mina.easein, () => {
      this.state.draw.select('#menu').animate({ transform: 's0 0' }, 100, mina.easein, () => {
        this.state.draw.select('.st6').attr({stroke: strokeCircle})
      })
    })
    loadingCircle.animate({ transform: 's1 1' }, 100, mina.easeinout)
    let strokeOffset = loadingCircle.attr('stroke-dashoffset').replace('px', '')
    Snap.animate(strokeOffset, '0', value => {
      loadingCircle.attr({ 'stroke-dashoffset': value })
    }, (strokeOffset / circumf) * 500, mina.easeinout, () => {
      loadingCircle.animate({ transform: 's0 0' }, 100, mina.easeinout, () => {
        this.state.draw.select('#menu').animate({ transform: 's1 1' }, 1000, mina.bounce, () => {
          loadingCircle.attr({ 'stroke-dashoffset': circumf })
          this.setState({isClicked: true})
        })
      })
    })
  }

  render () {
    return (
      <div id='home'>
        <svg id='draw' x='0px' y='0px'
          viewBox='0 0 400 400' >
          <g onClick={event => this.setStrokeColorSircle(event)} id="items">
            <circle className="st1" id="st1" cx="115.4" cy="155.5" r="8.5"/>
            <circle className="st2" id="st2" cx="57.7" cy="142.9" r="8.5"/>
            <circle className="st3" id="st3" cx="81.7" cy="43" r="8.5"/>
            <circle className="st4" id="st4" cx="137.3" cy="54.8" r="8.5"/>
            <circle className="st5" cx="40.5" cy="85" r="8.5"/>
            <circle className="st0" cx="155" cy="111" r="8.5"/>
          </g>
          <g id="menu">
            <circle onClick={() => this.menuClickHandler()} style={{stroke: 'red'}} className="st6" cx="97.3" cy="99.3" r="11.7"/>
          </g>
        </svg>
      </div>
    )
  }
}
export default Home
