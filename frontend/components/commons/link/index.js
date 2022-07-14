import styles from "./link.module.css";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CustomLink({ children, ...props }) {
  const { pathname, asPath, push } = useRouter();

  let className = `${styles.link}`;

  if (pathname === props.href) {
    className = `${className} ${styles.activeLink}`;
  }

  return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
}
