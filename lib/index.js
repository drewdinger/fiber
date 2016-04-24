import refresh from './refresh'
import { loadDataAsync } from './actions'
import { loadWaterDataAsync } from './actions'

loadWaterDataAsync()
loadDataAsync()
refresh()
