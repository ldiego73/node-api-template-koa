import data from './data.json'

export default class {
  async findAll() {
    return new Promise(resolve => resolve(data))
  }

  async findByIso(iso) {
    return new Promise(resolve => {
      resolve(data.find(c => c.iso === iso))
    })
  }

  async insert(entity) {
    return true
  }
}
