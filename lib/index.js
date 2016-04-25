import refresh from './refresh'
import { loadDataAsync } from './actions'
import { loadWaterDataAsync } from './actions'
import { loadRoadDataAsync } from './actions'
import { loadTourismDataAsync } from './actions'

loadTourismDataAsync()
loadRoadDataAsync()
loadWaterDataAsync()
loadDataAsync()
refresh()
