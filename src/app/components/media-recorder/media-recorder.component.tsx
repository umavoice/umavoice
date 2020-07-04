import SpeechToText from '../../../interfaces/speech-to-text';
import { sendRequest } from '../send-file-request/send-file-request.component';
import ExerciseDto from "../../../interfaces/exercise-dto";

export default class MediaRecorderWebApi implements SpeechToText {
  mediaRecorder!: MediaRecorder;
  chunks: BlobPart[];

  constructor() {
    this.chunks = [];
  }

  stopSpeechToText(): void{
    this.mediaRecorder.stop();
    console.log("recorder stopped");

    window.streamReference.getAudioTracks().forEach((track: MediaStreamTrack ) => {
      track.stop();
    });
    window.streamReference = null;
    console.log("recorder released");
    console.log(this.chunks)
  }

  startSpeechToText():Promise<boolean> {
    console.log("micCue hit");

    const promise:Promise<boolean>  = new Promise((resolve, reject) => {
      if (navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");
  
        this.chunks = [];
  
        const onSuccess = (stream: MediaStream) => {
          window.streamReference = stream;
          this.mediaRecorder = new MediaRecorder(window.streamReference);
          this.mediaRecorder.start(1000);
          console.log(this.mediaRecorder.state);
          console.log("recorder started");
  
          this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
            this.chunks.push(e.data);
          };

          resolve(true);
        };
  
        const onError = (err: DOMException) => {
          console.log("The following error occured: " + err);

          reject(false);
        };
  
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(onSuccess, onError);
      } else {
        console.log("getUserMedia not supported on your browser!");

        reject(false);
      }
    });

    return promise;
  }

  clearChunks() {
    this.chunks = [];
  }

  mountFile() {
    const blob = new Blob(this.chunks, { type: "audio/webm; codecs=opus" });
    this.clearChunks();
    const file = new File([blob], "webAudio.webm", {
      type: "audio/webm"
    });

    return file;
  }

  getFinalSpeech() {
    const promise: Promise<string> = new Promise(async (resolve, reject) => {

      const file = this.mountFile();
      const result: ExerciseDto = await sendRequest(file);
      const text = result.text;
      resolve(text);
    })

    return promise;
  }
}
