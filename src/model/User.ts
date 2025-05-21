import mongoose,{Schema,Document} from "mongoose";
//messade model
export interface Message extends Document{
    content:string;
    createdAt:Date;
}
//message Schema
const MessageSchema:Schema<Message> =new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }

})
//user model
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifycode:string;
    verifycodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[];
    
}
//user schema
const UserSchema:Schema<User> =new Schema({
    username:{
        type:String,
        required:[true,"User Name is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
       equired:[true,"User Email is required"],
       unique:true,
       match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"please use valid email"]
       
    },
    password:{
        type:String,
        required:[true,"password is required "],

        
    },
    
    verifycode:{
        type:String,
        required:[true,"veryfy code is required"]
    },
    verifycodeExpiry: {
        type:Date,
        required:[true,"veryfy code is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]

})
const  UserModel=(mongoose.models.User as  mongoose.Model<User>)|| mongoose.model<User>("User",UserSchema)
export default UserModel;