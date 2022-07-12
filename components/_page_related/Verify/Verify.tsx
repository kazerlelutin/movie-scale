import classes from "./Verify.module.css";
import Logo from "../../../public/logo.webp";
import Image from "next/image";
import Link from "next/link";

export default function Verify() {
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <p>Vous allez recevoir un mail vous permettant de vous connecter.</p>
        <p>Vous pourrez fermer cette page un fois authentifié.</p>
      </div>
      <Link href="/" passHref>
        <Image src={Logo} width={50} height={29} alt="logo" />
      </Link>
    </div>
  );
}
