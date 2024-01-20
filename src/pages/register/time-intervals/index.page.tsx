import {  Heading, MultiStep, Text, Checkbox, TextInput, Button} from "@ignite-ui/react";
import { Header,Container } from "../styles";
import { IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "@/utils/get-week-days";

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals (){

    const {
        register,
        handleSubmit,
        control,
        formState: {isSubmitting, errors}
     } = useForm({
        defaultValues:{
          intervals : [
            {weekDay: 0, enabled:false, startTime:'08:00', endTime: '18:00'},
            {weekDay: 1, enabled:true, startTime:'08:00', endTime: '18:00'},
            {weekDay: 2, enabled:true, startTime:'08:00', endTime: '18:00'},
            {weekDay: 3, enabled:true, startTime:'08:00', endTime: '18:00'},
            {weekDay: 4, enabled:true, startTime:'08:00', endTime: '18:00'},
            {weekDay: 5, enabled:true, startTime:'08:00', endTime: '18:00'},
            {weekDay: 6, enabled:false, startTime:'08:00', endTime: '18:00'}
              
          ]
        }
    })
      
    const weekDays = getWeekDays()

    const { fields } = useFieldArray({
        control,
        name: 'intervals'
    })

    async function handleSetTimeIntervals(){

    }

    return(
       <Container>
            <Header>
                <Heading as='strong'>
                   Conecte sua agenda!
                </Heading>
                <Text>
                    Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos á medida em que são agendados    
                </Text>
                <MultiStep size={4} currentStep={3}/>
            </Header>

            <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
                <IntervalContainer>
                        {fields.map((field, index)=>{
                            return(
                                <IntervalItem key={field.id}>
                                    <IntervalDay>
                                        <Checkbox/>
                                        <Text>{weekDays[field.weekDay]}</Text>
                                    </IntervalDay>
                                    <IntervalInputs>
                                        <TextInput
                                            size='sm'
                                            type="time"
                                            step={60}
                                            crossOrigin=''
                                            {...register(`intervals.${index}.startTime`)}
                                        />
                                        <TextInput
                                            size='sm'
                                            type="time"
                                            step={60}
                                            crossOrigin=''
                                            {...register(`intervals.${index}.endTime`)}
                                        />
                                    </IntervalInputs>
                                </IntervalItem>
                            )
                        })}
                </IntervalContainer>  

                <Button type="submit">
                    Próximo passo
                    <ArrowRight/>
                </Button>
            </IntervalBox>   
       </Container>
   )
}