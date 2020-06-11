export default class SendRequest {

  send(file: any) {
    const formData = new FormData();
    formData.append("audioData", file);

    const pathApi = "/api";

    console.log("before fetch");
    fetch(pathApi, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
