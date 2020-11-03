const os = require('os')

function getSocketPath (name) {
  name = name || process.env.HYPERSPACE_SOCKET || 'hyperspace'
  return os.platform() !== 'win32' ? `${os.tmpdir()}/${name}.sock` : `\\\\.\\pipe\\${name}`
}

function isEventEmitter (o) {
  return typeof o === 'object' && o !== null && typeof o.on === 'function'
}

module.exports = function getNetworkOptions (opts) {
  if (isEventEmitter(opts)) return opts
  if (!opts.host && !opts.port) return getSocketPath()
  if (opts.host && !opts.port) return getSocketPath(opts.host)
  return { host: opts.host, port: opts.port }
}
