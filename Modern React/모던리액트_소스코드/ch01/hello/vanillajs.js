let props = {name: '리액트'};
App(props);

function App(props) {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = '리액트 시작';
    const p = document.createElement('p');
    p.textContent = '안녕? ' + props.name;
    div.append(h1);
    div.append(p);
    document.body.append(div);
}