"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-gray-100 p-2 flex gap-5 ">
      <div className="text-2xl font-bold text-gray-600">로그인 인증</div>
      <div className="ml-auto flex gap-2">
        <Link className="button" href="/customers">고객 목록</Link>
        <Link className="button" href="/products">제품 목록</Link>
      </div>
      <div className="ml-auto flex gap-2">
      </div>
    </div>
  );
};

export default Header;
