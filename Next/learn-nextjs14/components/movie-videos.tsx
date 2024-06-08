import { API_URL } from "../app/(home)/page";

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 강제로 Error 발생
  // throw new Error('something broke...')
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return <h5>{JSON.stringify(videos)}</h5>;
}
