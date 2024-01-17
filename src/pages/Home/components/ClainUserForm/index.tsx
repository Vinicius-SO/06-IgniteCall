import { TextInput, Button } from "@ignite-ui/react"
import {ArrowRight} from 'phosphor-react'

import { Form } from "./styles"
import { useForm } from "react-hook-form"
import { z } from "zod"

const claimUsernameFormSchema = z.object({
    username: z.string()
})


export function ClaimUsernameForm(){

    const { register, handleSubmit } = useForm()

    async function handleClaimUserName(data: any){
        console.log(data)
    }
    return(
       <Form as="form" onSubmit={handleSubmit(handleClaimUserName)}>
            <TextInput 
                size='sm'
                prefix="ignite.com/"
                placeholder="seu-usuario"
                {...register('username')} 
                crossOrigin={undefined}
            />
            <Button size='sm' type='submit'>
                Reservar 
                <ArrowRight/>
            </Button>   
         
       </Form>
   )
}