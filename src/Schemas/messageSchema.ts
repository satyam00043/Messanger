import {z} from "zod"
 export const messageSchema=z.object({
    content:z.string()
    
    .min(10,"message must be 10 digit long")
    .max(300,"message must be lessthan 300 character ")
    
 })