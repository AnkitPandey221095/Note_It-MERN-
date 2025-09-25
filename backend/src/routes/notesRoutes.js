import express from "express"
import {getreq,postreq,getidreq,putreq,deletreq} from "../controler/notesRouteFunc.js"

const route=express.Router()

route.get("/",getreq)
route.post("/",postreq)
route.get("/:id",getidreq)
route.put("/:id",putreq)
route.delete("/:id",deletreq)

export default route;