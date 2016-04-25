import React, {Component, PropTypes} from 'react'

import FiberMap from './FiberMap'
import FiberCostTable from './FiberCostTable'
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      river: true,
      street: true,
      tour: true
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


  render(){
    const { fibers } = this.props    
    return(

  <div><div className="row">
  <div className="container"><hr/><hr/></div>
      <fieldset>
      <legend>Preferences:</legend>
    <p>
      <input type="checkbox" id="test5" checked={this.state.river} onClick={this.handleClick.bind(this)}/>
      <label htmlFor="test5" style={{color: 'green'}}>Show/Hide Rivers</label>
      <span style={{marginRight: 5 + 'em'}}></span>
      <input type="checkbox" id="test6" checked={this.state.street} onClick={this.handleClickStreet.bind(this)}/>
      <label htmlFor="test6" style={{color: 'black'}}>Show/Hide Streets</label>
      <span style={{marginRight: 5 + 'em'}}></span>
      <input type="checkbox" id="test7" checked={this.state.tour} onClick={this.handleClickTourism.bind(this)}/>
      <label htmlFor="test7" style={{color: 'orange'}}>Show/Hide Tourism</label>

    </p>
</fieldset>

</div><div className="row">
        <div className="col s4">
          <FiberCostTable {...this.props}/>
        </div>
        <div className="col s8">
          <FiberMap data={this.state} {...this.props} />
        </div>
      </div></div>


      );
  }
}
