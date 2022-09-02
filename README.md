# MediaRecorderStream

The [w3c Media Recorder](https://w3c.github.io/mediacapture-record/#mediarecorder-api) as a Node-like stream using [streamx](https://github.com/streamxorg/streamx). This means it acts mostly like a node stream WITHOUT requiring browser polyfills and buffer ulike the [node stream version](https://github.com/mafintosh/media-recorder-streamx).

```bash
npm i media-recorder-streamx
```

## Usage:

```js
import MediaRecorderStream from 'media-recorder-streamx'

const video = await navigator.mediaDevices.getUserMedia({ video: true })

const stream = new MediaRecorderStream(video, { videoBitsPerSecond: 1000000 })

stream.start(1000) // 1000ms chunking intervals, optional
```
Consumption:
```js
// as async iterator:
for await (const blob of stream) {
  await FileSystemWritableFileStream.write(blob)
}
await FileSystemWritableFileStream.close() // save file

// or as a node-like stream
const blobs = []

stream.on('data', blob => {
  blobs.push(blob)
})

// EOS package is not needed
stream.on('end', () => {
  // for browsers without FSA API
  const joined = new Blob(blobs, { type: blobs[0].mimeType })
  const downloadEl = document.createElement('a')
  downloadEl.href = URL.createObjectURL(joined)
  downloadEl.download = 'my_recording.webm'
  downloadEl.click()
  URL.revokeObjectURL(joined)
})
```

## Syntax:
```js
new MediaRecorderStream(stream)
new MediaRecorderStream(stream, options)
```
## Parameters:
- stream
  - The MediaStream that will be recorded. This source media can come from a stream created using navigator.`mediaDevices.getUserMedia()` or from an `<audio>`, `<video>` or `<canvas>` element.

- options Optional
  - `mimeType`: A MIME type specifying the format for the resulting media; you may specify the container format (the browser will select its preferred codecs for audio and/or video), or you may use the codecs parameter and/or the `profiles` parameter to provide detailed information about which codecs to use and how to configure them. Applications can check in advance if a `mimeType` is supported by the user agent by calling MediaRecorder.isTypeSupported().
  - `audioBitsPerSecond`: The chosen bitrate for the audio component of the media.
  - `videoBitsPerSecond`: The chosen bitrate for the video component of the media.
  - `bitsPerSecond`: The chosen bitrate for the audio and video components of the media. This can be specified instead of the above two properties. If this is specified along with one or the other of the above properties, this will be used for the one that isn't specified.
  - `signal`: AbortSignal that triggers `.destroy` on `abort`
  - `map`: Function to map input data

## Methods:
- `MediaRecorderStream.start(timeslice)`: Begins recording media; this method can optionally be passed a `timeslice` argument with a value in milliseconds. If this is specified, the media will be captured in separate chunks of that duration, rather than the default behavior of recording the media in a single large chunk.
- `MediaRecorderStream.stop()`: Stops recording, at which point a final output of saved data is fired. No more recording occurs. This doesn't end the stream. Can be started again.
- `MediaRecorderStream.destroy()`: Stops recording and destroys the stream. Cannot be started again.
- `MediaRecorderStream.pause()`: Pauses the stream and recording of media.
- `MediaRecorderStream.resume()`: Resumes the stream and recording of media after having been paused.

## Events: 
- `MediaRecorderStream.on('readable')`: Emitted when data is pushed to the stream if the buffer was previously empty.
- `MediaRecorderStream.on('data', data)`: Emitted when data is being read from the stream. If you attach a data handler you are implicitly resuming the stream.
- `MediaRecorderStream.on('end')`: Emitted when the readable stream has ended and no data is left in it's buffer.
- `MediaRecorderStream.on('close')`: Emitted when the readable stream has fully closed (i.e. it's destroy function has completed)
- `MediaRecorderStream.on('error', err)`: Emitted if any of the stream operations fail with an error. close is always emitted right after this.
- `MediaRecorderStream.on('piping', dest)`: Emitted when the readable stream is pipeing to a destination.
