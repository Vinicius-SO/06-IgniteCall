import { prisma } from "@/lib/prisma";
import { setCookie } from 'nookies'
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const UserSchema = z.object({
    username: z
    .string()
    .min(3)
    .regex(/^[a-z\\-]+/i),

    name: z
    .string()
    .min(3)
})

export default async function handlers(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method !== 'POST' ){
        return res.status(405).end() // METHOD NOT ALLOWED
    }


    const {name, username}  = UserSchema.parse(req.body)

    const userExists = await prisma.user.findUnique({
        where: {
            username
        }
    })
    
    if (userExists){
        return res.status(400).json({
            message:'Username already exist'
        })
    }
    const user = await prisma.user.create({
        data: {
            username,
            name,
        },
    })

    setCookie({res}, '@ignitecall:userId', user.id, {
        maxAge: 60 * 60 * 24 * 7, // 7days
        path: '/',
    })


    return res.status(201).json(user)
}