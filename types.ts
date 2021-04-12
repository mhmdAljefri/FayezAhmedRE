import * as CSS from "csstype"
import { DefaultCtx, SessionContext } from "blitz"
import { simpleRolesIsAuthorized } from "@blitzjs/server"
import { User } from "db"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: typeof simpleRolesIsAuthorized
    PublicData: {
      userId: User["id"]
      roles: string[] // NOTE: you now need to explicitly specify this field
    }
  }
}

declare global {
  export interface Window {
    // add you custom properties and methods
    cloudinary: any
  }
}

declare module "csstype" {
  interface Properties {
    contentVisibility?: "visible" | "auto" | "hidden"
    containIntrinsicSize?: number | string
  }
}
