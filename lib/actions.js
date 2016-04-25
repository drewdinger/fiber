import store from './store'
import refresh from './refresh'
import _ from 'lodash'
import geolib from 'geolib'
import $ from 'jquery'
import { NEARBY_METERS } from './constants'
import { x } from './components/App'

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

export function loadRoadDataAsync(){

  $.ajax('/data/roads.json').done(function(json) {
    store.geometries = json

    let roads = {}

    store.roads = _.map(json, (d) => {


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

export function loadTourismDataAsync(){

  $.ajax('/data/tourism.json').done(function(json) {
    store.geometries = json

    let tourisms = {}

    store.tourisms = _.map(json, (d) => {


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
  store.selectedPosition.roadDist = Number.MAX_SAFE_INTEGER;
  store.selectedPosition.tourismDist = Number.MAX_SAFE_INTEGER;

  _.forEach(store.fibers, forEachFiberSetIsSelected)

  _.forEach(store.waters, forEachWaterIsSelected)
  
  _.forEach(store.roads, forEachRoadIsSelected)

  _.forEach(store.tourisms, forEachTourismIsSelected)

  _.forEach(store.fibers, forEachFiberSetCost)


  refresh()
}

//
// private helper function
//

// helper to set each fiber's 'isSelected' flag based on whether this fiber is
// nearby with respect to the position selected by the user
function forEachFiberSetIsSelected(fiber){

  if(geolib.getDistance(fiber.center, store.selectedPosition) <= x){

    fiber.isSelected = true
    //console.log('true')
  }
  
  else{
    fiber.isSelected = false 
  }
}

// Retrieve distance from water
function forEachWaterIsSelected(water){
  water.dist = geolib.getDistance(store.selectedPosition, water.center);
  if (water.dist < store.selectedPosition.waterDist) {
    store.selectedPosition.waterDist = water.dist
  }
    if(geolib.getDistance(water.center, store.selectedPosition) <= NEARBY_METERS){

    water.isSelected = true
    //console.log('true')
  }
  
  else{
    water.isSelected = false 
  }
}

// Retrieve distance from roads
function forEachRoadIsSelected(road){
  road.dist = geolib.getDistance(store.selectedPosition, road.center);
  if (road.dist < store.selectedPosition.roadDist) {
    store.selectedPosition.roadDist = road.dist
  }
  if(geolib.getDistance(road.center, store.selectedPosition) <= NEARBY_METERS){

    road.isSelected = true
    //console.log('true')
  }
  
  else{
    road.isSelected = false 
  }
}

// Retrieve distance from tourism spots
function forEachTourismIsSelected(tourism){
  tourism.dist = geolib.getDistance(store.selectedPosition, tourism.center);
  if (tourism.dist < store.selectedPosition.tourismDist) {
    store.selectedPosition.tourismDist = tourism.dist
  }
  if(geolib.getDistance(tourism.center, store.selectedPosition) <= NEARBY_METERS){

    tourism.isSelected = true
    //console.log('true')
  }
  
  else{
    tourism.isSelected = false 
  }
}
// helper to set the cost of connecting this fiber to the selected position
function forEachFiberSetCost(fiber){

  // TODO: implement the logic to calcualte the cost of connecting from the selected
  // position to this fiber, and the distance between them.
  

  const fiberLoc = 
  {
  latitude: fiber.geometry.coordinates[0][1],longitude: fiber.geometry.coordinates[0][0]
  }
  //count number of times it passes through water
  var waterCount = 0;
  _.forEach(store.waters, function(water){
    const waterLoc = {
      latitude: water.geometry.coordinates[0][1], longitude: water.geometry.coordinates[0][0]}
    //check if lat lng is within bounds
    var latdist = Math.abs(fiberLoc.latitude - store.selectedPosition.lat);
    if (Math.abs(waterLoc.latitude - fiberLoc.latitude) < latdist && Math.abs(waterLoc.latitude - store.selectedPosition.lat) < latdist){
      var lngdist = Math.abs(fiberLoc.longitude - store.selectedPosition.lng);
      if (Math.abs(waterLoc.longitude - fiberLoc.longitude) < lngdist && Math.abs(waterLoc.longitude - store.selectedPosition.lng) < lngdist){
        waterCount = 1;
      }
    }
  });
  var roadCount = 0
  _.forEach(store.roads, function(road){
    const roadLoc = {
      latitude: road.geometry.coordinates[0][1], longitude: road.geometry.coordinates[0][0]}
    var latdist = Math.abs(fiberLoc.latitude - store.selectedPosition.lat);
    if (Math.abs(roadLoc.latitude - fiberLoc.latitude) < latdist && Math.abs(roadLoc.latitude - store.selectedPosition.lat) < latdist){
      var lngdist = Math.abs(fiberLoc.longitude - store.selectedPosition.lng);
      if (Math.abs(roadLoc.longitude - fiberLoc.longitude) < lngdist && Math.abs(roadLoc.longitude - store.selectedPosition.lng) < lngdist){
        roadCount = 1;
      }
    }
  });

  if (fiber.isSelected) 
  {
  const fiberLoc = 
  {
  latitude: fiber.geometry.coordinates[0][1],longitude: fiber.geometry.coordinates[0][0]
  }

  fiber.distance = geolib.getDistance(fiber.center, store.selectedPosition);
  
  
  //$5 per meter
  fiber.cost = 5 * fiber.distance + (100000 * waterCount) + (100000* roadCount);
  }
  else 
  {
    fiber.cost = 0
    fiber.distance = 0
  }

}
