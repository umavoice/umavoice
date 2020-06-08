export default class Record {
  mediaRecorder;
  chunks;
  blob;

  micStop() {
    this.mediaRecorder.stop();
    console.log("recorder stopped");

    window.streamReference.getAudioTracks().forEach((track) => {
      track.stop();
    });
    window.streamReference = null;
    console.log("recorder released");
    console.log(this.chunks)
  }

  micCue() {
    console.log("micCue hit");

    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");

      this.chunks = [];

      let onSuccess = (stream) => {
        window.streamReference = stream;
        this.mediaRecorder = new MediaRecorder(window.streamReference);
        this.mediaRecorder.start(1000);
        console.log(this.mediaRecorder.state);
        console.log("recorder started");

        this.mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
        };
      };

      let onError = (err) => {
        console.log("The following error occured: " + err);
      };

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(onSuccess, onError);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
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
