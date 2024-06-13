import FCounter from './fcounter';
import CCounter from './ccounter';
export default function Home() {
  return (
    <div>
      <CCounter title="클래스 카운터"/>
      <FCounter title="함수형 카운터"/>
    </div>
  )
}
