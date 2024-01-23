import {  Heading, MultiStep, Text, Checkbox, TextInput, Button} from "@ignite-ui/react";
import { Header,Container } from "../styles";
import { FormError, IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from "./styles";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertTimeStringToMinutes } from "@/utils/convert-time-in-minutes";
import { api } from "@/lib/axios";

const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number().min(0).max(6),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string()
  }))
  .length(7)
  .transform((intervals) => intervals.filter((interval) => interval.enabled))
  .refine((intervals) => intervals.length > 0, {
    message: 'Você precisa selecionar pelo menos um dia da semana',
  })
  .transform((intervals) => {
    return intervals.map((interval) => {
      return {
        weekDay: interval.weekDay,
        startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
      }
    })
  })
  .refine(intervals => {
    return intervals.every(interval => interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes)
  },{
    message: 'O horário de termino deve ser pelo  menos uma hora distante do de inicio'
  })
  
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>

type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>


export default function TimeIntervals (){

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: {isSubmitting, errors}
     } = useForm<TimeIntervalsFormInput, any, TimeIntervalsFormOutput>({
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
        },
        resolver: zodResolver(timeIntervalsFormSchema)
    })
      
    const weekDays = getWeekDays()

    const { fields } = useFieldArray({
        control,
        name: 'intervals'
    })

    const intervals = watch('intervals')

    async function handleSetTimeIntervals(data: TimeIntervalsFormOutput){
      const { intervals } = data as TimeIntervalsFormOutput
      
      await api.post("/users/time-intervals", {
        intervals,
   });
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
                                        <Controller
                                          name = {`intervals.${index}.enabled`}
                                          control={control}
                                          render={({ field })=>{
                                            return (
                                              <Checkbox 
                                                onCheckedChange={checked=>{
                                                  field.onChange(checked === true)
                                                }}
                                                checked={field.value}
                                              />  
                                            )
                                          }}
                                        />
                                        <Text>{weekDays[field.weekDay]}</Text>
                                    </IntervalDay>
                                    <IntervalInputs>
                                        <TextInput
                                            size='sm'
                                            type="time"
                                            step={60}
                                            crossOrigin=''
                                            {...register(`intervals.${index}.startTime`)}
                                            disabled={intervals[index].enabled === false}
                                        />
                                        <TextInput
                                            size='sm'
                                            type="time"
                                            step={60}
                                            crossOrigin=''
                                            {...register(`intervals.${index}.endTime`)}
                                            disabled={intervals[index].enabled === false}
                                        />
                                    </IntervalInputs>
                                </IntervalItem>
                            )
                        })}
                </IntervalContainer>  
                
                {errors.intervals && (
                  <FormError size="sm">{errors.intervals.root?.message}</FormError>
                  )
                }

                <Button type="submit">
                    Próximo passo
                    <ArrowRight/>
                </Button>
            </IntervalBox>   
       </Container>
   )
}