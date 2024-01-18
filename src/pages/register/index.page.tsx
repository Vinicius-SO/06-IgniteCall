import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Header,Container, Form, FormError } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";

const registerFormSchema = z.object({
    username: z
    .string()
    .min(3)
    .regex(/^[a-z\\-]+/i, {
        message: 'O usuário pode ter apenas letras e hifens'
    })
    .toLowerCase(),
    name: z
        .string()
        .min(3, { message: 'O nome precisa ter pelo menos 3 letras.'})
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register (){

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting}
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    const router = useRouter()

    useEffect(()=>{
        if(router.query.username){
            setValue('username', String(router.query.username))
        }
    },[router.query?.username])  

    function handleRegister(data: RegisterFormData) {
    console.log(data)
    }
    
    return(
       <Container>
            <Header>
                <Heading as='strong'>
                    Bem-vindo ao Ignite Call!
                </Heading>
                <Text>
                Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
                </Text>
                <MultiStep size={4} currentStep={1}/>
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size='sm'>
                        Nome de usuário
                    </Text>
                    <TextInput prefix="ignitecall.com/" placeholder="seu-usuário" crossOrigin={undefined} {...register('username')}/>
                    {errors.username && (
                        <FormError size="sm">{errors.username.message}</FormError>
                    )}
                </label>
                <label>
                    <Text size='sm'>
                        Nome Completo
                    </Text>
                    <TextInput  placeholder="seu-nome" crossOrigin={undefined} { ...register('name')}/>
                    {errors.name && (
                        <FormError size="sm">{errors.name.message}</FormError>
                    )}
                </label>
                <Button type='submit'>
                    Próximo passo
                    <ArrowRight/>
                </Button>
            </Form>
       </Container>
   )
}