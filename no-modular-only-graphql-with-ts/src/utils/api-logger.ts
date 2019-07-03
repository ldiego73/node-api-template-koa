import fs from 'fs'
import morgan from 'koa-morgan'

const accessLogStream = fs.createWriteStream(`${__dirname}/../access.log`, {
  flags: 'a',
})

const errorLogStream = fs.createWriteStream(`${__dirname}/../error.log`, {
  flags: 'a',
})

const access = morgan('combined', {
  stream: accessLogStream,
  skip(req, res) {
    return res.statusCode !== 200
  },
})
const error = morgan('combined', {
  stream: errorLogStream,
  skip(req, res) {
    return res.statusCode === 200 || res.statusCode === 204
  },
})

export { access, error }
