export default interface SpeechToText {
  startSpeechToText(): Promise<boolean>;
  stopSpeechToText(): void;
  getSpeech(): Promise<string>;
}
