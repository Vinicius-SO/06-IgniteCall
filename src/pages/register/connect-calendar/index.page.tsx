import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Header,Container } from "../styles";
import { ArrowRight, Check } from "phosphor-react";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function connectCalendar (){
    const session = useSession()

    const router = useRouter()

    const hasAuthError = !!router.query.error
    const isSignedId = session.status === 'authenticated'

    async function handleConnectCalendar() {
        await signIn('google')
    }

    function handleNextStep(){
      router.push('/register/time-intervals')
    }
    return(
      <>
        <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
        <Container>
            <Header>
                <Heading as='strong'>
                   Conecte sua agenda!
                </Heading>
                <Text>
                    Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos á medida em que são agendados    
                </Text>
                <MultiStep size={4} currentStep={2}/>
            </Header>

            <ConnectBox>
                <ConnectItem>
                    <Text>Google Calendar</Text>
                    {isSignedId ? (
                        <Button size="sm" disabled>
                        Conectado
                        <Check />
                        </Button>
                    ) : (
                        <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleConnectCalendar}
                        >
                        Conectar
                        <ArrowRight />
                        </Button>
                    )}
                </ConnectItem>
                {hasAuthError && (
                    <AuthError size="sm">
                        Falha ao se conectar ao Google, verifique se você habilitou as
                        permissões de acesso ao Google Calendar
                    </AuthError>
                )}

                <Button type="submit" disabled={!isSignedId} onClick={handleNextStep}>
                    Próximo passo
                    <ArrowRight/>
                </Button>
            </ConnectBox>
            
       </Container>
      </>
   )
}