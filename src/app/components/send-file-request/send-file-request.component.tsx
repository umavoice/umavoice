export function sendRequest(file: any):Promise<any> {

  const formData = new FormData();
  formData.append("audioData", file);

  const pathApi = "/api";
  const config = {
    method: "POST",
    body: formData
  }

  const promise:Promise<any> = new Promise((resolve, reject) => {
    fetch(pathApi, config)
    .then(res => res.json())
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      reject(error);
    });
  });

  return promise;
}
