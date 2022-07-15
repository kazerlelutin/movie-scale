import { Session } from "next-auth"
import { User } from "./User.interface"

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    expire: Date
    user: User
  }
}