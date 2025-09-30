import {employeeType} from './employee'
import {serviceType} from './service'
import {assetType} from './asset'
import {homeTeaserType} from './homeTeaser'
import {allInclusiveLeasingVehicleType} from './all-inclusive-leasing-vehicle'
import {teaserVehicleType} from './teaser-vehicle'
import {rentalVehicleType} from './rental-vehicle'

export const schemaTypes = [
  allInclusiveLeasingVehicleType,
  assetType,
  employeeType,
  homeTeaserType,
  serviceType,
  rentalVehicleType,
  teaserVehicleType,
]
