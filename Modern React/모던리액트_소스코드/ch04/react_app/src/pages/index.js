import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
// import MultiState from "./MultiState1";
import About from './About';
import List from "./List";
import Home from './Home';
import Profile from './Profile';
export default function Index() {
  return (
      <BrowserRouter>
      <div>
        <ul>
        <li>
            <Link to="/">홈으로</Link>
            {/* <a href="/">홈으로</a> */}
          </li>  
          <li>
            <Link to="/about">소개</Link>
            {/* <Link to="http://localhost:3000/about">소개</Link> */}
            {/* <a href="about">소개</a> */}
          </li>
          <li>
          <Link to="https://realdev-learning.com">리얼데브러닝으로</Link>
          </li>
          <li>
            <NavLink to="/profile" style={({isActive}) => isActive ? {color: 'red'} : {color: 'blue'}}>프로필</NavLink>
          </li>
          <li>
            <Link to="/about?detail=true">상세 소개</Link>
          </li>
          <li>
            <Link to="/list">사용자 목록</Link>
          </li>            
          <li>
            <Link to="/profile/realdev">리얼데브 프로필</Link>
          </li>  
        </ul>
        <hr/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/list" element={<List/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/:user" element={<Profile/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/*" element={<h1>존재하지 않는 페이지입니다.</h1>}/>
        </Routes>
      </div>
    </BrowserRouter>      
  )
}