import React, { useState, useMemo, useDeferredValue, Suspense, useId } from "react";
import Spinner from './components/Spinner';

const cities = [
    "서울", "부산", "인천", "대전", "대구", "울산", "광주",
    "경기도", "강원도", "충청북도", "충청남도", "경상북도", 
    "경상남도", "전라북도", "전라남도", "제주도"
];

const UseDeferredValue = () => {
  const [city, setCity] = useState("");
  const deferredCity = useDeferredValue(city);
  const onChange = (e) => {
		setCity(e.target.value);
  };
  const id = useId();
  const list = useMemo(() => {
    return cities.filter(item => item.includes(deferredCity));
  }, [deferredCity]);

  return (
    <>
      <input onChange={onChange} />
      <Suspense fallback={<Spinner/>}>
        <ul>
          {list.map(item => (
            <li key={id}>{item}</li>
          ))}
        </ul>
      </Suspense>
    </>
  );
}

export default UseDeferredValue;