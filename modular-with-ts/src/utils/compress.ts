import compress from 'koa-compress'

export default compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH,
})
