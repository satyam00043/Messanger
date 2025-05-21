import {z} from "zod"
 export const signInSchema=z.object({
   identifiera:z.string() ,
   password:z.string()
 })