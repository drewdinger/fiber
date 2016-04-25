import React, {Component, PropTypes} from 'react'
import { Map, Marker, Popup, TileLayer, Polyline, LayerGroup, Path } from 'react-leaflet'
import _ from 'lodash'

import TourismGeometry from './TourismGeometry'
import TourismCenter from './TourismCenter'

export default class TourismLayerGroup extends Component {

  render(){

    // Q: How does each property get provided?
    const { map, tourisms, selectedPosition, show } = this.props
    if (this.props.show === false){
      return <div></div>
    }

    const geometryElements = _.map(tourisms, (tourism,i) => {


        var color = '#ff9100'

        return <TourismGeometry geometry={tourism.geometry} selectedPosition={selectedPosition} key={i} map={map} color={color}/>
  // Q: Why do we have to specify map={map}?
  // Q: Why do we have to specify key={i}?
})

const centerElements = _.map(tourisms, (tourism,i) => {

    return <TourismCenter center={tourism.center} key={i} map={map}/>
// Q: Why do we have to specify map={map}?
// Q: Why do we have to specify key={i}?
})

return <LayerGroup map={map}>
  { geometryElements }
  </LayerGroup>
}

}