import Menu from "./components/commons/Menu";
import '@/styles/globals.css';
const Header = () => {
    return (
        <>
            <header>
                <div className="m-12 text-center text-5xl font-extrabold">온라인 주문 관리 시스템</div>
                <Menu />
            </header>
            <hr/>
        </>
    );
}
export default Header;