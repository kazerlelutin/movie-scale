import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/LoginButton/LoginButton'
import styles from '../styles/Home.module.css'
import Logo from "../public/logo.webp";
import { useSession } from 'next-auth/react';
import Index from '../components/_page_related/Index/Index';


/**
 * 
 * 
 * 
 */
export default function Home() {
  const { data: session } = useSession();

  console.log(session)
  return <Index/>
}
