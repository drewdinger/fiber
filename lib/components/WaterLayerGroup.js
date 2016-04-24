import React, {Component, PropTypes} from 'react'
import { Map, Marker, Popup, TileLayer, Polyline, LayerGroup, Path } from 'react-leaflet'
import _ from 'lodash'

import WaterGeometry from './WaterGeometry'
import WaterCenter from './WaterCenter'

export default class WaterLayerGroup extends Component {

  render(){

    // Q: How does each property get provided?
    const { map, waters, selectedPosition } = this.props
    console.log(waters);

    const geometryElements = _.map(waters, (water,i) => {


        var color = 'green'

        return <WaterGeometry geometry={water.geometry} selectedPosition={selectedPosition} key={i} map={map} color={color}/>
  // Q: Why do we have to specify map={map}?
  // Q: Why do we have to specify key={i}?
})

const centerElements = _.map(waters, (water,i) => {

    return <WaterCenter center={water.center} key={i} map={map}/>
// Q: Why do we have to specify map={map}?
// Q: Why do we have to specify key={i}?
})

return <LayerGroup map={map}>
  { geometryElements }
  </LayerGroup>
}

}