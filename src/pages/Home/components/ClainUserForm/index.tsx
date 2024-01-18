import { TextInput, Button, Text } from "@ignite-ui/react"
import {ArrowRight} from 'phosphor-react'

import { Form, FormAnnotation } from "./styles"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

const claimUsernameFormSchema = z.object({
    username: z.string()
    .min(3, {message:'O usuário precisa ter pelo menos 3 letras'})
    .regex(/^([a-z\\-]+)$/i, {message: 'O usuário deve conter apenas letras e hífens'})
    .toLowerCase()
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm(){

    const { register, handleSubmit, formState:{errors} } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema)
    })

    async function handleClaimUserName(data: ClaimUsernameFormData){
        console.log(data)
    }
    return(
        <>
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
            <FormAnnotation>
                <Text size='sm'>
                    {errors.username ? errors.username.message : 'Digite o nome de usuário desejado'}
                </Text>
            </FormAnnotation>
        </>
         
   )
}