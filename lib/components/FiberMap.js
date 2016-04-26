import React, {Component, PropTypes} from 'react'

import { Map, Marker, Popup, TileLayer, Polyline, LayerGroup, Path, Circle } from 'react-leaflet'

import _ from 'lodash'

import TourismLayerGroup from './TourismLayerGroup'
import RoadLayerGroup from './RoadLayerGroup'
import WaterLayerGroup from './WaterLayerGroup'
import FiberLayerGroup from './FiberLayerGroup'
import SelectedPosition from './SelectedPosition'

// React component for adding our own content to the map
class FiberMapContent extends Component {

  render(){
    let renderWater = this.props.data.river;
    let renderRoad = this.props.data.street;
    let renderTourism = this.props.data.tour;
    //let obstruction = document.getElementById('test7').checked;
    //console.log(renderWater);
    // Q: How did `selectedPosition` get passed in as a property?
    // Q: How did `fibers` get passed in as a property?
    const { map, waters, roads, tourisms, fibers, selectedPosition } = this.props
    return (<div>
      <TourismLayerGroup tourisms={tourisms} selectedPosition={selectedPosition} map={map} show={renderTourism}/>
      <RoadLayerGroup roads={roads} selectedPosition={selectedPosition} map={map} show={renderRoad}/>
      <WaterLayerGroup waters={waters} selectedPosition={selectedPosition} map={map} show={renderWater}/>
      <FiberLayerGroup fibers={fibers} selectedPosition={selectedPosition} map={map}/>
      <SelectedPosition selectedPosition={selectedPosition} latlng={[this.props.data.lat,this.props.data.lng]} map={map}/>
    </div>);
  }
}

// React component for visualizing fiber locations on a map
export default class FiberMap extends Component {

  render(){

    // Q: How did `setSelectedPosition` get passed in as a property?
    const { setSelectedPosition } = this.props

    // Q: What does the expression (foo) => { ... } mean?
    const leafletClickHandler = (event) => {
      // Q: What are the fields available in `event`
      // console.log('leaflet click event', event)
      setSelectedPosition(event.latlng)
    }

    return  <Map center={this.props.center}
            onLeafletClick={leafletClickHandler}
            zoom={13}
            style={{
              height:445, 
              width:'100%',
              border: '5px solid #616161'
              }}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <FiberMapContent {...this.props}/>
      </Map>
  }

}
