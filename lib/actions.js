import store from './store'
import refresh from './refresh'
import _ from 'lodash'
import geolib from 'geolib'
import $ from 'jquery'
import { NEARBY_METERS } from './constants'

//
// Action functions
//

// Action to load fiber data asynchrnously
export function loadDataAsync(){

  $.ajax('/data/boulder.json').done(function(json) {
    store.geometries = json

    let fibers = {}

    store.fibers = _.map(json, (d) => {


      // TODO: implement the correct logic to compute the center of the geometry
      // hint: use geolib.getCenter()      

      const center = geolib.getCenter(d.coordinates)
      

      return {
        geometry: d,
        center: center
      }
    })

    refresh()
  })
}

export function loadWaterDataAsync(){

  $.ajax('/data/riversTest.json').done(function(json) {
    store.geometries = json

    let waters = {}

    store.waters = _.map(json, (d) => {


        // TODO: implement the correct logic to compute the center of the geometry
        // DOES NOT WORK SO FAR
        // hint: use geolib.getCenter()

        const center = geolib.getCenter(d.coordinates)


        return {
          geometry: d,
          center: center
        }
      });

    refresh()
  })
}

// Action to set a position selected by the user
export function setSelectedPosition(latlng) {
  store.selectedPosition = latlng
  store.selectedPosition.waterDist = Number.MAX_SAFE_INTEGER;
  _.forEach(store.fibers, forEachFiberSetIsSelected)

  _.forEach(store.waters, forEachWaterIsSelected)

  _.forEach(store.fibers, forEachFiberSetCost)


  refresh()
}

//
// private helper function
//

// helper to set each fiber's 'isSelected' flag based on whether this fiber is
// nearby with respect to the position selected by the user
function forEachFiberSetIsSelected(fiber){

  if(geolib.getDistance(fiber.center, store.selectedPosition) <= NEARBY_METERS){

    fiber.isSelected = true
    //console.log('true')
  }
  
  else{
   fiber.isSelected = false 
  }
}

// Retrieve distance from
function forEachWaterIsSelected(water){
  water.dist = geolib.getDistance(store.selectedPosition, water.center);
  if (water.dist < store.selectedPosition.waterDist) {
    store.selectedPosition.waterDist = water.dist
  }
}

// helper to set the cost of connecting this fiber to the selected position
function forEachFiberSetCost(fiber){

  // TODO: implement the logic to calcualte the cost of connecting from the selected
  // position to this fiber, and the distance between them.
  const fiberLoc = {
  latitude: fiber.geometry.coordinates[0][1],longitude: fiber.geometry.coordinates[0][0]}

  fiber.distance = geolib.getDistance(fiber.center, store.selectedPosition);
  //$5 per meter
  fiber.cost = 5 * fiber.distance + (100/store.selectedPosition.waterDist);
}
