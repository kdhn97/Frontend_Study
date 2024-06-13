'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";

const Denied = () => {
  const { data: session } = useSession();
  const user: any = session?.user;
  return (
    <>
      <div className="text-2xl font-bold text-center text-red-800">접근 금지</div>
      <div className="text-lg font-bold text-red-800">관리자만 접근할 수 있습니다!!</div>
      <div className="mt-4 mb-4 flex gap-4">
        <p>이메일 : {user && user.email}</p>
        <p>권한: {user && user.role}</p>
      </div>
      <Link className="button" href="/">홈으로</Link> 
    </>
  )
}

export default Denied;