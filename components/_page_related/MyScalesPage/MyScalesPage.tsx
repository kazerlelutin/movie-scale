import Layout from "../../_layouts/Layout";
import WithPagination from "../../WithPagination/WithPagination";

import Scales from "../../Scales/Scales";
import OgBalise from "../../OgBalise/OgBalise";

export default function MyScalesPage() {

  return (
    <Layout ogBalise={()=><OgBalise/> }>
        <WithPagination url="/scale/scales" cursorType="id" >
            <Scales />
        </WithPagination>
    </Layout>
  );
}
