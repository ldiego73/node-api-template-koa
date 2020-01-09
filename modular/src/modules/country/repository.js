import countriesV1 from './data/v1/countries.json'
import countriesV2 from './data/v2/countries.json'

export default class {
  async findAll() {
    return new Promise(resolve => resolve(countriesV1))
  }

  async findAllV2() {
    return new Promise(resolve => resolve(countriesV2))
  }

  async findByIso(iso) {
    return new Promise(resolve => {
      resolve(countriesV1.find(c => c.iso === iso))
    })
  }

  async insert(entity) {
    return true
  }
}
