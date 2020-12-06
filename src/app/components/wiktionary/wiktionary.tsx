const endpoint = "https://en.wiktionary.org/api/rest_v1/page/html/";

const parseHTML = (html:string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(html, 'text/html');
  const pronunciation = htmlDoc.querySelector(".IPA")?.textContent;
  return pronunciation;
}

export const getPronunciation = async (word:string) => {

  const pronunciation = await fetch(endpoint+word)
  .then(response => response.text())
  .then(html => parseHTML(html))
  .then(pronunciation => pronunciation);

  return pronunciation;
}
