import React from 'react'
import { useForm, Controller, useController, UseFormRegister, Control } from 'react-hook-form'
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  RadioGroup,
  Radio,
  HStack,
  Box,
} from '@chakra-ui/react'

// Type
interface FormData {
  name: string
  email: string
  age: number
  gender: string
}

// Memoized text input using register
const NameInput = React.memo(({ register, error }: {
  register: UseFormRegister<FormData>
  error?: string
}) => {
  console.log('Rendering NameInput')
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input id="name" {...register('name')} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
})

// Input using useController
const EmailInput = React.memo(({ control }: { control: Control<FormData, any, FormData> }) => {
  console.log('Rendering EmailInput')
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'email', control })

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input id="email" {...field} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
})

// Input using Controller component
const AgeInput = React.memo(({ control }: { control: Control<FormData, any, FormData> }) => {
  console.log('Rendering AgeInput')
  return (
    <Controller
      name="age"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor="age">Age</FormLabel>
          <Input id="age" type="number" {...field} />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
})

export const DemoForm = () => {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log('Submitted:', data)
  }

  return (
    <Box maxW="500px" m="4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <NameInput register={register} error={errors.name?.message} />
          <EmailInput control={control} />
          <AgeInput control={control} />

          <FormControl isInvalid={!!errors.gender}>
            <FormLabel>Gender</FormLabel>
           
            <RadioGroup {...register('gender')} onChange={(value) => setValue('gender', value, { shouldValidate: true })}>
              <HStack spacing={4}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </HStack>
            </RadioGroup>

            <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal">Submit</Button>
        </VStack>
      </form>
    </Box>
  )
}

export default DemoForm
