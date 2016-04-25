import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

// React component for visualizing fiber locations on a map
export default class FiberCostTable extends Component {

  render(){

    const { fibers } = this.props

    const rowHeaders = <div className="row" style={{marginBottom:0}}>
        <br/><div className="col s2 center"><b>ID</b></div>
        <div className="col s5 center"><b>Cost ($)</b></div>
        <div className="col s5 center"><b>Distance (m) </b></div>
      </div>

    const rowHeaders2 = <div className="row" style={{marginBottom:0}}>
        <br/><div className="col s12 center"><b>Distance from A to B</b></div>
      </div>


    const rowElements = _.map(fibers, (fiber, i) => {

      // TODO: add logic here to highlight the selected fibers (rows)
      // hint: check the flag: fiber.isSelected
      // hint: (1) add "backgroundColor" in style={}, or
      // (2) add a color word, like className="row yellow"

      const className = !fiber.isSelected ? 'row' : 'row black' //figure out a way to color border orange

      if (fiber.cost.toFixed(0) == 0){
        return <div></div>
      }
        return <div key={i} className={className} style={{marginBottom:0}}>
        <div className="col s2"> {i} </div>
        <div className="col s5"> ${fiber.cost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </div>
        <div className="col s5"> {fiber.distance} m</div>
      </div>


    })
    const rowElements2 = _.map(fibers, (fiber, i) => {

        return <div><div className="col s6">{fiber.newDistance}m</div>
                    <div className="col s6">${fiber.newCost}</div></div>


    })


    return <div><div className="orange accent-3 center white-text">
      { rowHeaders }
      <div id="scrollable">
      <ul className="grey darken-1 white-text">
        { rowElements }
      </ul>
      </div>
        <hr/><hr/>
    </div>
    <div className="orange accent-3 center white-text">
      { rowHeaders2 }
      <div id="AtoB">
      <ul className="grey darken-1 white-text">
        { rowElements2 }
      </ul>
      </div>
    </div>
    </div>
  }
  componentDidMount() {
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }
}
