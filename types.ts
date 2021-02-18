import * as CSS from "csstype"
import { DefaultCtx, SessionContext, DefaultPublicData } from "blitz"
import { User } from "db"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface PublicData extends DefaultPublicData {
    userId: User["id"]
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
