import { API_URL } from "../app/(home)/page";

async function getMovie(id:string) {
  // 2초 동안 강제 Loading
await new Promise((resolve) => setTimeout(resolve, 2000));
const response = await fetch(`${API_URL}/${id}`)
return response.json()
}

export default async function MovieInfo({id}: {id:string}) {
  const movie = await getMovie(id)
  return <h5>{JSON.stringify(movie)}</h5>
}