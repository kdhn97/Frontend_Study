import React, { useState, useTransition } from "react";

const cities = [
    "서울", "부산", "인천", "대전", "대구", "울산", "광주",
    "경기도", "강원도", "충청북도", "충청남도", "경상북도", 
    "경상남도", "전라북도", "전라남도", "제주도"
];

const UseTransition = () => {
  const [isPending, startTransition] = useTransition();
  const [city, setCity] = useState("");
  const [items, setItems] = useState([]);
  const handleClick = () => {
    alert(city);
  }
  const handleChange = (e) => {
    setCity(e.target.value);
    startTransition(() => {
        const newItems = cities.filter(
            p => p.includes(e.target.value)
        ).sort();
        setItems(newItems)
    });
  }
  return (
    <div>
      <div>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="시/도 검색 ......"
          tabIndex={0}
        />
        {isPending && <p>대기 중...</p>}
        <button
          onClick={handleClick}
        >
          검색
        </button>
      </div>

      <div>
        <ul>
          {items.map((item, index) => {
            return (
              <li key={index}
                onClick={() => {
                  setCity(item);
                }}
              >
                <button>{item}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default UseTransition;

