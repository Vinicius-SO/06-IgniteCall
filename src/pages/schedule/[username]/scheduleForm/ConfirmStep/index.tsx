import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, {message: 'O nome deve possuir 3 ou mais carácteres'}),
  email: z.string().min(3,{message: 'Digite um email valído '}),
  observation: z.string()
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const { register, handleSubmit, formState} = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema)
  })

  function handleConfirmScheduling() {}

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" crossOrigin={undefined} {...register('name')}/>
        {formState.errors.name && <FormError size='sm'>{formState.errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput type="email" placeholder="johndoe@example.com" crossOrigin={undefined} {...register('email')} />
        {formState.errors.email && <FormError size='sm'>{formState.errors.email.message}</FormError>}

      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observation')}/>
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={formState.isSubmitting}>Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}