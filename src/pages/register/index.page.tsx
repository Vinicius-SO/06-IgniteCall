import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Header,Container, Form } from "./styles";
import { ArrowRight } from "phosphor-react";

export default function Register (){
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

            <Form as='form'>
                <label>
                    <Text size='sm'>
                        Nome de usuário
                    </Text>
                    <TextInput prefix="ignitecall.com/" placeholder="seu-usuário" crossOrigin={undefined}/>
                </label>
                <label>
                    <Text size='sm'>
                        Nome Completo
                    </Text>
                    <TextInput  placeholder="seu-nome" crossOrigin={undefined}/>
                </label>
                <Button type='submit'>
                    Próximo passo
                    <ArrowRight/>
                </Button>
            </Form>
       </Container>
   )
}