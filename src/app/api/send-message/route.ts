import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";
import { Error } from "mongoose";

export async function POST(request: Request) {
    await dbConnect()

    const { username, content } = await request.json()
    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message:"User Not found"
                },
                {status:401}
            )
        }
        //is user accepting the messages

        if (!user.isAcceptMessage) {
            return Response.json(
                {
                    success: false,
                    message:"User is not accepting the messages"
                },
                {status:403}
            )
        }

        const newMessage = { content, createdAt: new Date() }
        
        user.message.push(newMessage as Message)
        await user.save()

        return Response.json(
            {
                success: true,
                message:" message sent successfully"
            },
            {status:200}
        )
    } catch (error) {
        console.log("An unexpected error occurred",Error)
        return Response.json(
            {
                success: false,
                message:"Not authenticated"
            },
            {status:500}
        )
    }
}