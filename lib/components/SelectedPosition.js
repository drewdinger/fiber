import React, {Component, PropTypes} from 'react'
import { Map, Marker, Popup, TileLayer, Polyline, LayerGroup, Path, Circle, CircleMarker } from 'react-leaflet'
import { NEARBY_METERS } from '../constants'
import { x } from './App'


export default class SelectedPosition extends Component {

  render(){
    const { map, latlng, selectedPosition } = this.props
    if (selectedPosition) {

      // TODO: create a <Circle/> using NEARBY_METERS as the radius
      const nearbyCircle = <Circle center={selectedPosition} map={map} radius={x}/>//<div/>

      const marker = <CircleMarker center={selectedPosition} map={map} radius={10}/>

      var newLoc =
      {
      lat: latlng[0], lng: latlng[1]
      }

      const pointMarker = <CircleMarker center={newLoc} map={map} radius={20} color={'red'}/>
      const centerPointMarker = <CircleMarker center={newLoc} map={map} radius={5} color={'red'}/>

      // Q: What's the difference beteween CircleMarker and Circle

      return <div>
        { nearbyCircle }
        { marker }
        { pointMarker }
        { centerPointMarker }

      </div>
    } else {

      return null
    }
  }
}
