import { NextApiRequest, NextApiResponse } from "next";

export default function handler (res:NextApiResponse, req:NextApiRequest  ) { 
 return res.json({message: 'hello'})
}