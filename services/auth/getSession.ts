import {prisma} from '../../db/db';
export default async function getSessionWithProfile({ session, token, user }){
  if(token && session){
    session.accessToken = token.accessToken
  }
  const userForSession = await prisma.user.findUnique({
    where: {
      id:user.id
    },
  })
  session.user = userForSession
  return session
}