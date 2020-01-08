const regex = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i
const clear = version => version.replace(/\./gi, '')
const cast = version => parseInt(version)

const versions = (versions, options = {}) => {
  let tuples = []

  if (options.fallbackLatest && options.defaultVersion) {
    throw new Error(
      'Can not set options "fallbackLatest" and "defaultVersion" at same time'
    )
  }

  for (let v in versions) tuples.push({ version: v, method: versions[v] })

  tuples.sort((a, b) => {
    const v1 = clear(a.version)
    const v2 = clear(b.version)

    return cast(v1) > cast(v2) ? 1 : -1
  })
}

versions({
  '1.3.0': () => console.log('version 1'),
  '1.0.0': () => console.log('version 2')
})
