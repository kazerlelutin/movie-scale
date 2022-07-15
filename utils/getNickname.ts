import { Session } from "../types/Session.interface";

export default function getNickname(session:Session):string{
    return session.user?.nickname || session.user.email.split("@")[0]
}