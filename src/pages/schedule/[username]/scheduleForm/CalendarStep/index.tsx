import { Calendar } from "@/components/Calendar";
import { Container, TimePicker,TimePickerHeader, TimePickerList, TimePickerItem } from "./styled";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep(){

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

const router = useRouter()
  
  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekday = selectedDate ? dayjs(selectedDate).format('dddd'): null 
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM'): null
  
  const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ["availability", selectedDateWithoutTime],
    queryFn: async () => {
      const { data } = await api.get(
        `/users/${username}/availability?date=${selectedDateWithoutTime}`
      );
  
      return data;
    },
    enabled: !!selectedDate
  })

  

  return(
       <Container isTimePickerOpen={isDateSelected}>
          <Calendar selectDate={selectedDate} onDateSelected={setSelectedDate}/>
          {isDateSelected && (
            <TimePicker>
              <TimePickerHeader>
                {weekday} <span>{describedDate}</span>
              </TimePickerHeader>
    
              <TimePickerList>
              {availability?.possibleTimes.map((hour) => {
                return (
                  <TimePickerItem
                    key={hour}
                    disabled={!availability.availableTimes.includes(hour)}
                  >
                    {String(hour).padStart(2, '0')}:00h
                  </TimePickerItem>
                )
              })}
              </TimePickerList>
            </TimePicker>
          )}
       </Container>
   )
}