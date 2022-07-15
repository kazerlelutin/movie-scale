import { getSession } from "next-auth/react";
import MyScalesPage from "../components/_page_related/MyScalesPage/MyScalesPage";

export default function myScales() {
  return <MyScalesPage />;
}

export async function getServerSideProps({ req }) {
  return (await getSession({ req }))
    ? {
        props: {},
      }
    : {
        redirect: { destination: "/" },
      };
}
