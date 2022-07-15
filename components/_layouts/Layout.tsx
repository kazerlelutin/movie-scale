import Image from "next/image";
import classes from "./Layout.module.css";
import Logo from "../../public/logo.webp";
import Head from "next/head";
import Nickname from "../Nickname/Nickname";
import { useSession } from "next-auth/react";
import LoginButton from "../LoginButton/LoginButton";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface props {
  readonly children: any
  readonly ogBalise: any
}

export default function Layout({ children,ogBalise }:props) {
  const { data: session } = useSession(),
    { pathname } = useRouter();

  useEffect(() => {
    console.log(
      "%cCandidat Murphy.",
      "color:green;font-size:8px;font-family:monospace;box-shadow: 0 0 5px black"
    );
  }, []);

  return (
    <>
    {ogBalise()}
    <div className={classes.container}>
      <header className={classes.header}>
      <Link href={"/"} passHref>
        <Image src={Logo} width={50} height={29} alt="logo" className={classes.logo}/>
        </Link>
        <div className={classes.actions}>
          {session && (
            <Link href={"/my-scales"} passHref>
              <a aria-current={pathname === "/my-scales"}>Mes échelles</a>
            </Link>
          )}
          {session ? <Nickname /> : <LoginButton />}
        </div>
      </header>
      <main>{children}</main>
    </div>
    </>
  );
}
