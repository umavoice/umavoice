export default interface SpeechToText {
  startSpeechToText(): Promise<boolean>;
  stopSpeechToText(): void;
  getFinalSpeech(): Promise<string>;
}
