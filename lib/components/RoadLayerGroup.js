import React, {Component, PropTypes} from 'react'
import { Map, Marker, Popup, TileLayer, Polyline, LayerGroup, Path } from 'react-leaflet'
import _ from 'lodash'

import RoadGeometry from './RoadGeometry'
import RoadCenter from './RoadCenter'

export default class RoadLayerGroup extends Component {

  render(){

    // Q: How does each property get provided?
    const { map, roads, selectedPosition, show } = this.props
    if (this.props.show === false){
      return <div></div>
    }

    const geometryElements = _.map(roads, (road,i) => {


        const color = !road.isSelected ? 'black' : 'red'

        return <RoadGeometry geometry={road.geometry} selectedPosition={selectedPosition} key={i} map={map} color={color}/>
  // Q: Why do we have to specify map={map}?
  // Q: Why do we have to specify key={i}?
})

const centerElements = _.map(roads, (road,i) => {

    return <RoadCenter center={road.center} key={i} map={map}/>
// Q: Why do we have to specify map={map}?
// Q: Why do we have to specify key={i}?
})

return <LayerGroup map={map}>
  { geometryElements }
  </LayerGroup>
}

}