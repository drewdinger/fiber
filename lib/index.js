import refresh from './refresh'
import { loadDataAsync } from './actions'
import { loadWaterDataAsync } from './actions'
import { loadRoadDataAsync } from './actions'

loadRoadDataAsync()
loadWaterDataAsync()
loadDataAsync()
refresh()
