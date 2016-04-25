import refresh from './refresh'
import { loadDataAsync } from './actions'
import { loadWaterDataAsync } from './actions'
import { loadRoadDataAsync } from './actions'
import { loadTourismDataAsync } from './actions'

loadRoadDataAsync()
loadWaterDataAsync()
loadTourismDataAsync()
loadDataAsync()
refresh()
