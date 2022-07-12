import ScalePage from "../../components/_page_related/ScalePage/ScalePage";
import { prisma } from "../../db/db";

interface props {
  readonly scale: {
    readonly id: string;
    readonly author: string;
    readonly name: string;
    readonly user:{
      readonly id: string;
      readonly nickname: string;
    };
  };
}

export default function Scale({ scale }:props) {
  return scale && <ScalePage name={scale.name} id={scale.id} ownerId={scale.user.id} author={scale.user.nickname}/> ;
}

export async function getServerSideProps({ query }) {

  const scale = await prisma.scalemovie.findUnique({
      where: { id: query.id },
      select: {
        name:true,
        id:true,
        user: {
          select:{
            id:true,
            nickname: true,
            email: true
          }
        }
      }
    });
 
  if(scale && scale.user && !scale.user?.nickname){
    scale.user.nickname = scale.user.email.split('@')[0]
  }

  return {
    props: { scale },
  };
}
