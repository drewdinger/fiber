import React, {Component, PropTypes} from 'react'

import FiberMap from './FiberMap'
import FiberCostTable from './FiberCostTable'
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      river: true
    }
  }

  handleClick(){
    this.setState({river: !this.state.river});
  }


  render(){
    const { fibers } = this.props    
    return(

  <div><div className="row">
      <fieldset>
      <legend>Preferences:</legend>
    <p>
    <input type="checkbox" id="test5" checked={this.state.river} onClick={this.handleClick.bind(this)}/>
<label htmlFor="test5">Show/Hide Rivers</label>
</p>
</fieldset>
<hr/><hr/>
</div><div className="row">
        <div className="col s4">
          <FiberCostTable {...this.props}/>
        </div>
        <div className="col s8">
          <FiberMap data={this.state} {...this.props} />
        </div>
      </div></div>);
  }
}
