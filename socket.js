const os = require('os')

module.exports = function getSocketPath (name) {
  name = name || 'hyperspace'
  return os.platform() !== 'win32' ? `${os.tmpdir()}/${name}.sock` : `\\\\.\\pipe\\${name}`
}
