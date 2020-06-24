import SpeechToText from '../../interfaces/speech-to-text';

export default class SpeechRecognition implements SpeechToText {
  recognition: any;
  forceStop = false;
  finalSpeechResult = [];

  constructor() {
    // @ts-ignore
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
    this.recognition = new SpeechRecognition() ;
    this.builder();
    }
  }

  startSpeechToText(): Promise<boolean>{
    const promise: Promise<boolean> = new Promise((resolve, reject) => {

      try {
        this.recognition.lang = "en-US";
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.continuous = true;
        this.recognition.speechResult = [];
        this.recognition.start();
        resolve(true);
      }
      catch (error) {
        console.log(error);
        reject(false);
      }
    });

    return promise;
  }

  stopSpeechToText() {
    this.finalSpeechResult = this.recognition.speechResult;
    this.forceStop = true;
    this.recognition.abort();
  }

  getFinalSpeech() {
    const promise:Promise<string> = new Promise(resolve => {
      const finalSpeechResult = this.finalSpeechResult.join(" ");
      resolve(finalSpeechResult);
    })

    return promise;
  }

  builder() {
    this.recognition.onresult = function (event: any) {
      
      const speechResult = event.results[event.results.length -1][0].transcript.toLowerCase();
      const confidente = event.results[event.results.length -1][0].confidence
      this.speechResult.push(...speechResult.trim().split(" "));
      console.log(this.speechResult);

      console.log("Confidence: " + confidente);
    };

    this.recognition.onspeechend = () => {
      this.recognition.stop();
    };

    this.recognition.onerror = (event: any) => {
      console.log("Error occurred in recognition:");
      console.log(event); //event.error
    };

    this.recognition.onaudiostart = (event: any) => {
      //Fired when the user agent has started to capture audio.
      console.log("SpeechRecognition.onaudiostart");
    };

    this.recognition.onaudioend = (event: any) => {
      //Fired when the user agent has finished capturing audio.
      console.log("SpeechRecognition.onaudioend");
    };

    this.recognition.onend = (event: any) => {
      //Fired when the speech recognition service has disconnected.
      console.log("SpeechRecognition.onend");
      if (this.forceStop) {
        this.forceStop = false;
      }
      else {
        this.startSpeechToText();
        console.log("Starting again");
      }
    };

    this.recognition.onnomatch = (event: any) => {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log("SpeechRecognition.onnomatch");
    };

    this.recognition.onsoundstart = (event: any) => {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log("SpeechRecognition.onsoundstart");
    };

    this.recognition.onsoundend = (event: any) => {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log("SpeechRecognition.onsoundend");
    };

    this.recognition.onspeechstart = (event: any) => {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log("SpeechRecognition.onspeechstart");
    };

    this.recognition.onstart = (event: any) => {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log("SpeechRecognition.onstart");
    };
  }
}
