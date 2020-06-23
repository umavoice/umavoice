declare global {
    interface Window {
        streamReference: any;
    }
}

export default class Record {
  mediaRecorder: any;
  chunks: any;
  blob: any;

  micStop() {
    this.mediaRecorder.stop();
    console.log("recorder stopped");

    window.streamReference.getAudioTracks().forEach((track: any) => {
      track.stop();
    });
    window.streamReference = null;
    console.log("recorder released");
    console.log(this.chunks)
  }

  micCue():Promise<boolean> {
    console.log("micCue hit");

    const promise:Promise<boolean>  = new Promise((resolve, reject) => {
      if (navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");
  
        this.chunks = [];
  
        let onSuccess = (stream: any) => {
          window.streamReference = stream;
          // @ts-ignore
          this.mediaRecorder = new MediaRecorder(window.streamReference);
          this.mediaRecorder.start(1000);
          console.log(this.mediaRecorder.state);
          console.log("recorder started");
  
          this.mediaRecorder.ondataavailable = (e: any) => {
            this.chunks.push(e.data);
          };

          resolve(true);
        };
  
        let onError = (err: any) => {
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
    const file = new File([blob], "webAudio.webm", {
      type: "audio/webm"
    });
    
    return file;
  }
}
