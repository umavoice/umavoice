const ffmpeg = require('fluent-ffmpeg');

export function wavConverter(
  fileName: string,
  filePath: string,
  newFilePath: string
  ):Promise<boolean> {

  const promise: Promise<boolean> = new Promise((resolve, reject) => {
    ffmpeg(filePath)
    .noVideo()
    .toFormat('wav')
    .save(newFilePath)
    .on('end', function(err: any) {
        resolve(true);
    })
    .on('error', function(err: any) {
        console.log('an error happened: ' + err.message);
        resolve(false);
    });
  });

  return promise;

}
