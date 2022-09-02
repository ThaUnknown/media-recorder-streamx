import { Readable } from 'streamx'

export default class MediaRecorderStream extends Readable {
  constructor (stream, opts) {
    super(opts)

    this._recorder = new MediaRecorder(stream, opts)
    this._recorder.addEventListener('dataavailable', this._handleData.bind(this))
  }

  pause () {
    if (this.destroyed) return
    this._recorder.pause()
    super.pause()
  }

  resume () {
    if (this.destroyed) return
    this._recorder.resume()
    super.resume()
  }

  start (timeslice) {
    if (this.destroyed) return
    this._recorder.start(timeslice)
  }

  stop () {
    if (this.destroyed) return
    this._recorder.stop()
  }

  _handleData ({ data }) {
    if (this.destroyed) return
    if (data.size > 0) this.push(data)
    if (!this._recorder) this.push(null)
  }

  _cleanup () {
    this._recorder?.stop()
    this._recorder?.removeEventListener('dataavailable', this._handleData)
    this._recorder = null
  }

  destroy () {
    this._cleanup()
  }

  _predestroy () {
    this._cleanup()
  }

  static isTypeSupported (...args) {
    return MediaRecorder.isTypeSupported(...args)
  }
}
