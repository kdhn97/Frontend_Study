import { useState, useMemo } from 'react';
const sort = (items) => {
    console.log(`${items} 정렬 중...`);
    return items.sort((a, b) => a - b);
}
const List = (props) => {
    const [items, setItems] = useState(props.items);
    // const sorted = sort(items);
    const sorted = useMemo(() => {
        return sort(items);
    }, [items]);
    const list = sorted.slice(0, props.max);
    return (
        <>
            <h3>목록: {props.max}개</h3>
            <ul>
                {list.map((item) => (
                    <li key={item}>
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}
export default List;

