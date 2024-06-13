import { useState } from 'react';

import Modal from './components/Modal';

function PortalForm() {
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.input.value.trim().length === 0)
      setError(true);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='input'>입력: </label>
      <input id="input"/>
      {error && <Modal onClose={() => setError(false)}>입력란이 비었습니다.</Modal>}
      {/* {error && 
        <div>
          <p>입력란이 비었습니다.</p>
          <button onClick={() => setError(false)}>확인</button>
        </div>} */}
      <button type="submit">제출</button>
    </form>
  );
}
export default PortalForm;

