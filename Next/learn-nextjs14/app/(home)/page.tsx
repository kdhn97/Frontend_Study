// "use client"
// import { useEffect, useState } from "react";

// import Link from "next/link";
// import { resolve } from "path";
// import { json } from "stream/consumers";
import Movie from "../../components/movie";
import styles from "../../styles/home.module.css"

export const metadata = {
  title: "Home",
};

// export 키워드는 함수를 비롯한 객체나 기본값을 모듈에서 내보내 다른 JavaScript 파일에서 사용할 수 있도록 합니다.
// const와 함께 사용하면, 상수를 모듈에서 내보낼 때 사용합니다.
// 이렇게 내보낸 상수는 다른 모듈에서 불러와서 사용할 수 있습니다.

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

// await는 JavaScript에서 비동기 코드를 동기적으로 실행하기 위해 사용하는 키워드입니다.
// async 함수 안에서만 사용할 수 있으며,
// await 키워드는 Promise가 해결될 때까지 함수의 실행을 일시 중지시킵니다.
// 이를 통해 비동기 작업이 완료된 후에 다음 코드를 실행할 수 있습니다.

async function getMovies() {
  // 1초 동안 강제 Loading
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  // 영화의 모든 정보 가져오기
  // return <div>{JSON.stringify(movies)}</div>;
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
        />
      ))}
    </div>
  );}

// fetch 하는 방법
// export default function Page() {
//   // Loding 화면
//   const [isLoading, setIsLoading] = useState(true)
//   // json 데이터 불러오기
//   const [movies, setMovies] = useState([])
//   const getMovies = async() => {
//     const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies")
//     const json = await response.json()
//     setMovies(json)
//     setIsLoading(false)
//   }
//   useEffect(() => {
//     getMovies()
//   }, [])

//   return (
//     <div>
//       {isLoading ? "Loading..." : JSON.stringify(movies)}
//     </div>
//   );
// }
