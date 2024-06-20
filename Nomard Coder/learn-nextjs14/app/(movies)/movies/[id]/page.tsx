import { Suspense } from "react";
import { API_URL } from "../../../(home)/page";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

// async function getMovie(id:string) {
//     // 1초 동안 강제 Loading
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const response = await fetch(`${API_URL}/${id}`)
//   return response.json()
// }

// async function getVideos(id:string) {
// await new Promise((resolve) => setTimeout(resolve, 1000));
// const response = await fetch(`${API_URL}/${id}/videos`)
// return response.json()
// }

interface IParams {
  params: { id: string };
}

// 반응형 Metadata - 영화 제목에 따라 사이트 이름 변경하는 방법
export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id)
  return {
    title: movie.title,
  };
}

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  // 방법 1
  // 아래와 같이 작성하면 직렬적으로 작동해서
  // getMovie가 Loading 될 떄까지 기다린 뒤, getVideos가 실행됨
  // const movie = await getMovie(id)
  // const video = await getVideos(id)

  // 방법 2
  // 아래와 같이 작성하면 병렬적으로 작동해서 동시에 실행됨
  // Promise.all을 사용하면 여러 비동기 작업(Promise)을 병렬로 실행하고,
  // 그 결과들이 배열로 반환되어 await에 의해 대기한 후, 배열의 각 요소에 할당됩니다.
  // 단점 : 모든 작업이 끝나야 UI가 보여짐
  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)])

  // 방법 3
  // 2번을 통하여 page파일에 두가지의 fetch을 병렬적으로 했지만 단점이 존재했다
  // 지금은 두가지의 component를 만들었다 -> movie-info + movie-videos
  // 이제는 먼저 rendering된 파일의 UI가 먼저 뜬다
  return (
    <div>
      {/* Suspense component에는 fallback이라는 prop가 있고,
      이것은 component가 await되는 동안 표시할 메시지를 render하게 해줌 
      -> 로딩 상태를 분리시키는 역할 */}
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
