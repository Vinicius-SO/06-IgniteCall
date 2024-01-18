import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Header,Container } from "../styles";
import { ArrowRight } from "phosphor-react";
import { ConnectBox, ConnectItem } from "./styles";

export default function connectCalendar (){
    
    return(
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
                    <Button variant={"secondary"} size="sm">Conectar</Button>
                </ConnectItem>
                <Button type='submit' >
                    Próximo passo
                    <ArrowRight/>
                </Button>
            </ConnectBox>
            
       </Container>
   )
}