import { getSession } from "next-auth/react";
import Verify from "../components/_page_related/Verify/Verify";

export default function LoginPage() {
  return <Verify />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {},
  };
}
