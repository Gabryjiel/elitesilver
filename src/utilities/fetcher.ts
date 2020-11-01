const server = 'http://localhost:3000/api/'

export default async function fetcher(url: string){
    const fetched = await fetch(server + url);
    const json = fetched.json();
    
    return json;
}