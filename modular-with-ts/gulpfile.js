const { src, dest, parallel } = require("gulp")
const uglify = require("gulp-uglify-es").default
const cp = require("gulp-copy")

function compress() {
  return src(".cache/**/*.js")
    .pipe(uglify())
    .pipe(dest("dist"))
}

function copy() {
  return src(["env.yaml", "./src/bin/*"]).pipe(cp("./dist", { prefix: 1 }))
}

exports.compress = compress
exports.copy = copy
