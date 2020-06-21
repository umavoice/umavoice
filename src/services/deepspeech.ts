// @ts-ignore 
const DeepSpeech = require('deepspeech');
const Fs = require('fs');
const Sox = require('sox-stream');
const MemoryStream = require('memory-stream');
const Duplex = require('stream').Duplex;
const Wav = require('node-wav');

export function startDeepSpeech(filePath: string) {

  console.log(__dirname);

  let modelPath =  __dirname + "/models/deepspeech-0.7.0-models.pbmm";

  let model = new DeepSpeech.Model(modelPath);

  let desiredSampleRate = model.sampleRate();

  let scorerPath = __dirname + '/models/deepspeech-0.7.0-models.scorer';

  model.enableExternalScorer(scorerPath);

  if (!Fs.existsSync(filePath)) {
    console.log('file missing:', filePath);
    process.exit();
  }

  const buffer = Fs.readFileSync(filePath);
  const result = Wav.decode(buffer);

  if (result.sampleRate < desiredSampleRate) {
    console.error('Warning: original sample rate (' + result.sampleRate + ') is lower than ' + desiredSampleRate + 'Hz. Up-sampling might produce erratic speech recognition.');
  }

  function bufferToStream(buffer: any) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  let audioStream = new MemoryStream();
  bufferToStream(buffer).pipe(Sox({
    global: {
      'no-dither': true,
    },
    output: {
      bits: 16,
      rate: desiredSampleRate,
      channels: 1,
      encoding: 'signed-integer',
      endian: 'little',
      compression: 0.0,
      type: 'raw'
    }
  })).pipe(audioStream);

  audioStream.on('finish', () => {
    let audioBuffer = audioStream.toBuffer();

    const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);
    console.log('audio length', audioLength);

    let result = model.stt(audioBuffer);
    // let result = model.sttWithMetadata(audioBuffer);

    console.log(audioBuffer);
    console.log(result);
  });
}
