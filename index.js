const messages = require('./messages')
const HRPC = require('hrpc-runtime')
const RPC = require('hrpc-runtime/rpc')

const errorEncoding = {
  encode: messages.RPCError.encode,
  encodingLength: messages.RPCError.encodingLength,
  decode (buf, offset) {
    const { message, code, errno, details } = messages.RPCError.decode(buf, offset)
    errorEncoding.decode.bytes = messages.RPCError.decode.bytes
    const err = new Error(message)
    err.code = code
    err.errno = errno
    err.details = details
    return err
  }
}

class HRPCServiceHyperspace {
  constructor (rpc) {
    const service = rpc.defineService({ id: 1 })

    this._status = service.defineMethod({
      id: 1,
      requestEncoding: RPC.NULL,
      responseEncoding: messages.HyperspaceStatusResponse
    })

    this._stop = service.defineMethod({
      id: 2,
      requestEncoding: RPC.NULL,
      responseEncoding: RPC.NULL
    })
  }

  onRequest (context, handlers = context) {
    if (handlers.status) this._status.onrequest = handlers.status.bind(context)
    if (handlers.stop) this._stop.onrequest = handlers.stop.bind(context)
  }

  status () {
    return this._status.request()
  }

  statusNoReply () {
    return this._status.requestNoReply()
  }

  stop () {
    return this._stop.request()
  }

  stopNoReply () {
    return this._stop.requestNoReply()
  }
}

class HRPCServiceCorestore {
  constructor (rpc) {
    const service = rpc.defineService({ id: 2 })

    this._open = service.defineMethod({
      id: 1,
      requestEncoding: messages.OpenRequest,
      responseEncoding: messages.OpenResponse
    })

    this._onFeed = service.defineMethod({
      id: 2,
      requestEncoding: messages.FeedEvent,
      responseEncoding: RPC.NULL
    })
  }

  onRequest (context, handlers = context) {
    if (handlers.open) this._open.onrequest = handlers.open.bind(context)
    if (handlers.onFeed) this._onFeed.onrequest = handlers.onFeed.bind(context)
  }

  open (data) {
    return this._open.request(data)
  }

  openNoReply (data) {
    return this._open.requestNoReply(data)
  }

  onFeed (data) {
    return this._onFeed.request(data)
  }

  onFeedNoReply (data) {
    return this._onFeed.requestNoReply(data)
  }
}

class HRPCServiceHypercore {
  constructor (rpc) {
    const service = rpc.defineService({ id: 3 })

    this._get = service.defineMethod({
      id: 1,
      requestEncoding: messages.GetRequest,
      responseEncoding: messages.GetResponse
    })

    this._append = service.defineMethod({
      id: 2,
      requestEncoding: messages.AppendRequest,
      responseEncoding: messages.AppendResponse
    })

    this._update = service.defineMethod({
      id: 3,
      requestEncoding: messages.UpdateRequest,
      responseEncoding: RPC.NULL
    })

    this._seek = service.defineMethod({
      id: 4,
      requestEncoding: messages.SeekRequest,
      responseEncoding: messages.SeekResponse
    })

    this._has = service.defineMethod({
      id: 5,
      requestEncoding: messages.HasRequest,
      responseEncoding: messages.HasResponse
    })

    this._cancel = service.defineMethod({
      id: 6,
      requestEncoding: messages.CancelRequest,
      responseEncoding: RPC.NULL
    })

    this._download = service.defineMethod({
      id: 7,
      requestEncoding: messages.DownloadRequest,
      responseEncoding: RPC.NULL
    })

    this._downloaded = service.defineMethod({
      id: 8,
      requestEncoding: messages.DownloadedRequest,
      responseEncoding: messages.DownloadedResponse
    })

    this._undownload = service.defineMethod({
      id: 9,
      requestEncoding: messages.UndownloadRequest,
      responseEncoding: RPC.NULL
    })

    this._close = service.defineMethod({
      id: 10,
      requestEncoding: messages.CloseRequest,
      responseEncoding: RPC.NULL
    })

    this._registerExtension = service.defineMethod({
      id: 11,
      requestEncoding: messages.RegisterExtensionRequest,
      responseEncoding: RPC.NULL
    })

    this._unregisterExtension = service.defineMethod({
      id: 12,
      requestEncoding: messages.UnregisterExtensionRequest,
      responseEncoding: RPC.NULL
    })

    this._sendExtension = service.defineMethod({
      id: 13,
      requestEncoding: messages.ExtensionMessage,
      responseEncoding: RPC.NULL
    })

    this._acquireLock = service.defineMethod({
      id: 14,
      requestEncoding: messages.LockRequest,
      responseEncoding: RPC.NULL
    })

    this._releaseLock = service.defineMethod({
      id: 15,
      requestEncoding: messages.LockRequest,
      responseEncoding: RPC.NULL
    })

    this._onAppend = service.defineMethod({
      id: 16,
      requestEncoding: messages.AppendEvent,
      responseEncoding: RPC.NULL
    })

    this._onClose = service.defineMethod({
      id: 17,
      requestEncoding: messages.CloseEvent,
      responseEncoding: RPC.NULL
    })

    this._onPeerOpen = service.defineMethod({
      id: 18,
      requestEncoding: messages.PeerEvent,
      responseEncoding: RPC.NULL
    })

    this._onPeerRemove = service.defineMethod({
      id: 19,
      requestEncoding: messages.PeerEvent,
      responseEncoding: RPC.NULL
    })

    this._onExtension = service.defineMethod({
      id: 20,
      requestEncoding: messages.ExtensionMessage,
      responseEncoding: RPC.NULL
    })

    this._onWait = service.defineMethod({
      id: 21,
      requestEncoding: messages.WaitEvent,
      responseEncoding: RPC.NULL
    })

    this._watchDownloads = service.defineMethod({
      id: 22,
      requestEncoding: messages.WatchDownloadsRequest,
      responseEncoding: RPC.NULL
    })

    this._unwatchDownloads = service.defineMethod({
      id: 23,
      requestEncoding: messages.UnwatchDownloadsRequest,
      responseEncoding: RPC.NULL
    })

    this._onDownload = service.defineMethod({
      id: 24,
      requestEncoding: messages.DownloadEvent,
      responseEncoding: RPC.NULL
    })

    this._watchUploads = service.defineMethod({
      id: 25,
      requestEncoding: messages.WatchUploadsRequest,
      responseEncoding: RPC.NULL
    })

    this._unwatchUploads = service.defineMethod({
      id: 26,
      requestEncoding: messages.UnwatchUploadsRequest,
      responseEncoding: RPC.NULL
    })

    this._onUpload = service.defineMethod({
      id: 27,
      requestEncoding: messages.UploadEvent,
      responseEncoding: RPC.NULL
    })
  }

  onRequest (context, handlers = context) {
    if (handlers.get) this._get.onrequest = handlers.get.bind(context)
    if (handlers.append) this._append.onrequest = handlers.append.bind(context)
    if (handlers.update) this._update.onrequest = handlers.update.bind(context)
    if (handlers.seek) this._seek.onrequest = handlers.seek.bind(context)
    if (handlers.has) this._has.onrequest = handlers.has.bind(context)
    if (handlers.cancel) this._cancel.onrequest = handlers.cancel.bind(context)
    if (handlers.download) this._download.onrequest = handlers.download.bind(context)
    if (handlers.downloaded) this._downloaded.onrequest = handlers.downloaded.bind(context)
    if (handlers.undownload) this._undownload.onrequest = handlers.undownload.bind(context)
    if (handlers.close) this._close.onrequest = handlers.close.bind(context)
    if (handlers.registerExtension) this._registerExtension.onrequest = handlers.registerExtension.bind(context)
    if (handlers.unregisterExtension) this._unregisterExtension.onrequest = handlers.unregisterExtension.bind(context)
    if (handlers.sendExtension) this._sendExtension.onrequest = handlers.sendExtension.bind(context)
    if (handlers.acquireLock) this._acquireLock.onrequest = handlers.acquireLock.bind(context)
    if (handlers.releaseLock) this._releaseLock.onrequest = handlers.releaseLock.bind(context)
    if (handlers.onAppend) this._onAppend.onrequest = handlers.onAppend.bind(context)
    if (handlers.onClose) this._onClose.onrequest = handlers.onClose.bind(context)
    if (handlers.onPeerOpen) this._onPeerOpen.onrequest = handlers.onPeerOpen.bind(context)
    if (handlers.onPeerRemove) this._onPeerRemove.onrequest = handlers.onPeerRemove.bind(context)
    if (handlers.onExtension) this._onExtension.onrequest = handlers.onExtension.bind(context)
    if (handlers.onWait) this._onWait.onrequest = handlers.onWait.bind(context)
    if (handlers.watchDownloads) this._watchDownloads.onrequest = handlers.watchDownloads.bind(context)
    if (handlers.unwatchDownloads) this._unwatchDownloads.onrequest = handlers.unwatchDownloads.bind(context)
    if (handlers.onDownload) this._onDownload.onrequest = handlers.onDownload.bind(context)
    if (handlers.watchUploads) this._watchUploads.onrequest = handlers.watchUploads.bind(context)
    if (handlers.unwatchUploads) this._unwatchUploads.onrequest = handlers.unwatchUploads.bind(context)
    if (handlers.onUpload) this._onUpload.onrequest = handlers.onUpload.bind(context)
  }

  get (data) {
    return this._get.request(data)
  }

  getNoReply (data) {
    return this._get.requestNoReply(data)
  }

  append (data) {
    return this._append.request(data)
  }

  appendNoReply (data) {
    return this._append.requestNoReply(data)
  }

  update (data) {
    return this._update.request(data)
  }

  updateNoReply (data) {
    return this._update.requestNoReply(data)
  }

  seek (data) {
    return this._seek.request(data)
  }

  seekNoReply (data) {
    return this._seek.requestNoReply(data)
  }

  has (data) {
    return this._has.request(data)
  }

  hasNoReply (data) {
    return this._has.requestNoReply(data)
  }

  cancel (data) {
    return this._cancel.request(data)
  }

  cancelNoReply (data) {
    return this._cancel.requestNoReply(data)
  }

  download (data) {
    return this._download.request(data)
  }

  downloadNoReply (data) {
    return this._download.requestNoReply(data)
  }

  downloaded (data) {
    return this._downloaded.request(data)
  }

  downloadedNoReply (data) {
    return this._downloaded.requestNoReply(data)
  }

  undownload (data) {
    return this._undownload.request(data)
  }

  undownloadNoReply (data) {
    return this._undownload.requestNoReply(data)
  }

  close (data) {
    return this._close.request(data)
  }

  closeNoReply (data) {
    return this._close.requestNoReply(data)
  }

  registerExtension (data) {
    return this._registerExtension.request(data)
  }

  registerExtensionNoReply (data) {
    return this._registerExtension.requestNoReply(data)
  }

  unregisterExtension (data) {
    return this._unregisterExtension.request(data)
  }

  unregisterExtensionNoReply (data) {
    return this._unregisterExtension.requestNoReply(data)
  }

  sendExtension (data) {
    return this._sendExtension.request(data)
  }

  sendExtensionNoReply (data) {
    return this._sendExtension.requestNoReply(data)
  }

  acquireLock (data) {
    return this._acquireLock.request(data)
  }

  acquireLockNoReply (data) {
    return this._acquireLock.requestNoReply(data)
  }

  releaseLock (data) {
    return this._releaseLock.request(data)
  }

  releaseLockNoReply (data) {
    return this._releaseLock.requestNoReply(data)
  }

  onAppend (data) {
    return this._onAppend.request(data)
  }

  onAppendNoReply (data) {
    return this._onAppend.requestNoReply(data)
  }

  onClose (data) {
    return this._onClose.request(data)
  }

  onCloseNoReply (data) {
    return this._onClose.requestNoReply(data)
  }

  onPeerOpen (data) {
    return this._onPeerOpen.request(data)
  }

  onPeerOpenNoReply (data) {
    return this._onPeerOpen.requestNoReply(data)
  }

  onPeerRemove (data) {
    return this._onPeerRemove.request(data)
  }

  onPeerRemoveNoReply (data) {
    return this._onPeerRemove.requestNoReply(data)
  }

  onExtension (data) {
    return this._onExtension.request(data)
  }

  onExtensionNoReply (data) {
    return this._onExtension.requestNoReply(data)
  }

  onWait (data) {
    return this._onWait.request(data)
  }

  onWaitNoReply (data) {
    return this._onWait.requestNoReply(data)
  }

  watchDownloads (data) {
    return this._watchDownloads.request(data)
  }

  watchDownloadsNoReply (data) {
    return this._watchDownloads.requestNoReply(data)
  }

  unwatchDownloads (data) {
    return this._unwatchDownloads.request(data)
  }

  unwatchDownloadsNoReply (data) {
    return this._unwatchDownloads.requestNoReply(data)
  }

  onDownload (data) {
    return this._onDownload.request(data)
  }

  onDownloadNoReply (data) {
    return this._onDownload.requestNoReply(data)
  }

  watchUploads (data) {
    return this._watchUploads.request(data)
  }

  watchUploadsNoReply (data) {
    return this._watchUploads.requestNoReply(data)
  }

  unwatchUploads (data) {
    return this._unwatchUploads.request(data)
  }

  unwatchUploadsNoReply (data) {
    return this._unwatchUploads.requestNoReply(data)
  }

  onUpload (data) {
    return this._onUpload.request(data)
  }

  onUploadNoReply (data) {
    return this._onUpload.requestNoReply(data)
  }
}

class HRPCServiceNetwork {
  constructor (rpc) {
    const service = rpc.defineService({ id: 4 })

    this._open = service.defineMethod({
      id: 1,
      requestEncoding: RPC.NULL,
      responseEncoding: messages.OpenNetworkResponse
    })

    this._configure = service.defineMethod({
      id: 2,
      requestEncoding: messages.ConfigureNetworkRequest,
      responseEncoding: messages.NetworkStatusResponse
    })

    this._status = service.defineMethod({
      id: 3,
      requestEncoding: messages.NetworkStatusRequest,
      responseEncoding: messages.NetworkStatusResponse
    })

    this._allStatuses = service.defineMethod({
      id: 4,
      requestEncoding: RPC.NULL,
      responseEncoding: messages.AllNetworkStatusesResponse
    })

    this._registerExtension = service.defineMethod({
      id: 5,
      requestEncoding: messages.RegisterExtensionRequest,
      responseEncoding: RPC.NULL
    })

    this._unregisterExtension = service.defineMethod({
      id: 6,
      requestEncoding: messages.UnregisterExtensionRequest,
      responseEncoding: RPC.NULL
    })

    this._sendExtension = service.defineMethod({
      id: 7,
      requestEncoding: messages.ExtensionMessage,
      responseEncoding: RPC.NULL
    })

    this._onPeerAdd = service.defineMethod({
      id: 8,
      requestEncoding: messages.PeerEvent,
      responseEncoding: RPC.NULL
    })

    this._onPeerRemove = service.defineMethod({
      id: 9,
      requestEncoding: messages.PeerEvent,
      responseEncoding: RPC.NULL
    })

    this._onExtension = service.defineMethod({
      id: 10,
      requestEncoding: messages.ExtensionMessage,
      responseEncoding: RPC.NULL
    })
  }

  onRequest (context, handlers = context) {
    if (handlers.open) this._open.onrequest = handlers.open.bind(context)
    if (handlers.configure) this._configure.onrequest = handlers.configure.bind(context)
    if (handlers.status) this._status.onrequest = handlers.status.bind(context)
    if (handlers.allStatuses) this._allStatuses.onrequest = handlers.allStatuses.bind(context)
    if (handlers.registerExtension) this._registerExtension.onrequest = handlers.registerExtension.bind(context)
    if (handlers.unregisterExtension) this._unregisterExtension.onrequest = handlers.unregisterExtension.bind(context)
    if (handlers.sendExtension) this._sendExtension.onrequest = handlers.sendExtension.bind(context)
    if (handlers.onPeerAdd) this._onPeerAdd.onrequest = handlers.onPeerAdd.bind(context)
    if (handlers.onPeerRemove) this._onPeerRemove.onrequest = handlers.onPeerRemove.bind(context)
    if (handlers.onExtension) this._onExtension.onrequest = handlers.onExtension.bind(context)
  }

  open () {
    return this._open.request()
  }

  openNoReply () {
    return this._open.requestNoReply()
  }

  configure (data) {
    return this._configure.request(data)
  }

  configureNoReply (data) {
    return this._configure.requestNoReply(data)
  }

  status (data) {
    return this._status.request(data)
  }

  statusNoReply (data) {
    return this._status.requestNoReply(data)
  }

  allStatuses () {
    return this._allStatuses.request()
  }

  allStatusesNoReply () {
    return this._allStatuses.requestNoReply()
  }

  registerExtension (data) {
    return this._registerExtension.request(data)
  }

  registerExtensionNoReply (data) {
    return this._registerExtension.requestNoReply(data)
  }

  unregisterExtension (data) {
    return this._unregisterExtension.request(data)
  }

  unregisterExtensionNoReply (data) {
    return this._unregisterExtension.requestNoReply(data)
  }

  sendExtension (data) {
    return this._sendExtension.request(data)
  }

  sendExtensionNoReply (data) {
    return this._sendExtension.requestNoReply(data)
  }

  onPeerAdd (data) {
    return this._onPeerAdd.request(data)
  }

  onPeerAddNoReply (data) {
    return this._onPeerAdd.requestNoReply(data)
  }

  onPeerRemove (data) {
    return this._onPeerRemove.request(data)
  }

  onPeerRemoveNoReply (data) {
    return this._onPeerRemove.requestNoReply(data)
  }

  onExtension (data) {
    return this._onExtension.request(data)
  }

  onExtensionNoReply (data) {
    return this._onExtension.requestNoReply(data)
  }
}

module.exports = class HRPCSession extends HRPC {
  constructor (rawSocket, { maxSize = 2 * 1024 * 1024 * 1024 } = {}) {
    super()

    this.rawSocket = rawSocket
    this.rawSocketError = null
    rawSocket.on('error', (err) => {
      this.rawSocketError = err
    })

    const rpc = new RPC({ errorEncoding, maxSize })
    rpc.pipe(this.rawSocket).pipe(rpc)
    rpc.on('close', () => this.emit('close'))
    rpc.on('error', (err) => {
      if ((err !== this.rawSocketError && !isStreamError(err)) || this.listenerCount('error')) this.emit('error', err)
    })

    this.hyperspace = new HRPCServiceHyperspace(rpc)
    this.corestore = new HRPCServiceCorestore(rpc)
    this.hypercore = new HRPCServiceHypercore(rpc)
    this.network = new HRPCServiceNetwork(rpc)
  }

  destroy (err) {
    this.rawSocket.destroy(err)
  }
}

function isStreamError (err) {
  return err.message === 'Writable stream closed prematurely' || err.message === 'Readable stream closed before ending'
}
