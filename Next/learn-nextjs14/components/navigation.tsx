"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/navigation.module.css"

export default function Navigation() {
  // Hook 사용
  const path = usePathname()

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {/* 헤당 페이지로 이동 시, ❤ 출력 */}
          <Link href="/">Home</Link> {path === "/" ? "❤" : ""}
        </li>
        <li>
          <Link href="/about-us">About Us</Link> {path === "/about-us" ? "❤" : ""}
        </li>
      </ul>
    </nav>
  );
}
