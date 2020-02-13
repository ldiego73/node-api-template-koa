/* eslint-disable no-console */

const LogLevel = {}

LogLevel[(LogLevel['Off'] = 0)] = 'Off'
LogLevel[(LogLevel['Error'] = 1)] = 'Error'
LogLevel[(LogLevel['Warning'] = 2)] = 'Warning'
LogLevel[(LogLevel['Info'] = 3)] = 'Info'
LogLevel[(LogLevel['Debug'] = 4)] = 'Debug'

class Logger {
  constructor(source) {
    this.source = source
  }

  static enableProductionMode() {
    Logger.level = LogLevel.Warning
  }

  debug(...objects) {
    this.log(console.log, LogLevel.Debug, objects)
  }

  info(...objects) {
    this.log(console.info, LogLevel.Info, objects)
  }
  warn(...objects) {
    this.log(console.warn, LogLevel.Warning, objects)
  }
  error(...objects) {
    this.log(console.error, LogLevel.Error, objects)
  }

  log(fn, level, objects) {
    if (level <= Logger.level) {
      const log = this.source
        ? [
            `%c${this.source}`,
            `background: #1976d2; color: white; padding: 2px 0.5em; border-radius: 0.5em;`,
          ].concat(objects)
        : objects

      fn.apply(console, log)
      Logger.outputs.forEach(output =>
        output.apply(output, [this.source, level, ...objects])
      )
    }
  }
}

Logger.level = LogLevel.Debug
Logger.outputs = []

export default Logger
