let rootURL = 'https://api.themoviedb.org/3/search/movie?api_key=';
let apikey = 'ebc5702a0455367987f95c10c8abbd6f';
export default async function(title) {
let url = `${rootURL}${apikey}&query=${title}`;
    const response = await fetch(url);
    const text = await response.text();
    let json = JSON.parse(text);
   // console.log(json)
    return json;
}