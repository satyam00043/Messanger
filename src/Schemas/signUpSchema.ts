import  {z} from 'zod'
export const usernameValidation=z
    .string()
    .min(2,"username Must be atleast 2 character  ")
    .max(20,"Username should be less than 20 character")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain sspecial character")
    

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message :"invalid email address"}),
    password:z.string().min(6,{message:"password at least 6 character long "})
})
