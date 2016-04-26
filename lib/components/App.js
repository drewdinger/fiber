import React, {Component, PropTypes} from 'react'

import FiberMap from './FiberMap'
import FiberCostTable from './FiberCostTable'

export var x = 500
export var lat=40.0150
export var lng=-105.2705
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      river: true,
      street: true,
      tour: true,
      lat: 40.0150,
      lng: -105.2705
    }
  }

  handleClick(){
    this.setState({river: !this.state.river});
  }
  
  handleClickStreet() {
    this.setState({street: !this.state.street});
  }

  handleClickTourism() {
    this.setState({tour: !this.state.tour});
  }
  handleRadiusChange() {
    x = document.getElementById("radiusSlider").value;  
    return x;
  }
  handlelat(){
    var x = document.getElementById('lat').value;
    this.setState({lat: x})
  }
  handlelng(){
    var y = document.getElementById('lng').value;
    this.setState({lng: y})
  }
  render(){
    const { fibers } = this.props   
    return(

  <div><div className="row">
  <div className="container"><hr/><hr/></div>
      <fieldset>
      <legend>Preferences:</legend>

    <p style={{textAlign: 'center'}}>
      <input type="checkbox" id="test5" checked={this.state.river} onClick={this.handleClick.bind(this)}/>
      <label htmlFor="test5" style={{color: 'green'}}>Show/Hide Rivers</label>
      <span style={{marginRight: 5 + 'em'}}></span>
      <input type="checkbox" id="test6" checked={this.state.street} onClick={this.handleClickStreet.bind(this)}/>
      <label htmlFor="test6" style={{color: 'black'}}>Show/Hide Streets</label>
      <span style={{marginRight: 5 + 'em'}}></span>
      <input type="checkbox" id="test7" checked={this.state.tour} onClick={this.handleClickTourism.bind(this)}/>
      <label htmlFor="test7" style={{color: 'orange'}}>Show/Hide Tourism</label>

      <p className="range-field">
        <input type="range" id="radiusSlider" min="0" max="1000" onChange={this.handleRadiusChange.bind(this.value)}/>
        <label htmlFor="radiusSlider">Radius (m)</label>
      </p>
    </p>
</fieldset>
<input type="text" id="lat" label="Enter Latitude" onChange={this.handlelat.bind(this)}></input><label htmlFor="lat">Enter Latitude</label>
  <input type="text" id="lng" onChange={this.handlelng.bind(this)}></input><label htmlFor="lng">Enter Longitude</label>

</div><div className="row">
        <div className="col s4">
          <FiberCostTable {...this.props}/>
        </div>
        <div className="col s8">
          <FiberMap data={this.state} {...this.props} />
        </div>
      </div>

      </div>




      );
  }
}
