import React from 'react'
import {
  Box, Button, Checkbox, Flex, FormControl, FormErrorMessage,
  FormLabel, GridItem, HStack, Input, Radio, RadioGroup,
  Select, SimpleGrid, usePrevious, VStack
} from '@chakra-ui/react'
import {
  useForm, useController, FormProvider
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import usePageTracking from '../../hooks/use-page-tracking'

const statesUSA = [
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
  { label: 'Florida', value: 'FL' },
  { label: 'Illinois', value: 'IL' },
]

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  age: Yup.number()
    .transform((v, o) => o === '' ? undefined : v)
    .typeError('Must be a number')
    .required('Age required')
    .min(18, 'Min age 18')
    .max(199, 'Max age 199'),
  gender: Yup.string().required('Gender required'),
  country: Yup.string().required('Country required'),
  state: Yup.string().when('country', {
    is: 'usa',
    then: (schema) => schema.required('State required'),
    otherwise: (schema) => schema.optional(),
  }),
  acceptedTerms: Yup.boolean().oneOf([true], 'Must accept terms'),
}).required()

type IFormInput = Yup.InferType<typeof schema>

// Isolated TextInput
const TextInput = React.memo(({ name, label, type = 'text' }: { name: keyof IFormInput, label: string, type?: string }) => {
  console.log(999444, `renrenderingg ${name} ${label}`)
  const { field, fieldState } = useController({ name })
  return (
    <FormControl isInvalid={!!fieldState.error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} {...field} type={type} />
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  )
})

// Isolated SelectInput
const SelectInput = React.memo(({ name, label, options }: { name: keyof IFormInput, label: string, options: { label: string, value: string }[] }) => {
  const { field, fieldState } = useController({ name })
  console.log(99958, 'Rendering the select input field of', field)
  return (
    <FormControl isInvalid={!!fieldState.error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select id={name} {...field} placeholder={`Select ${label.toLowerCase()}`}>
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </Select>
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  )
})

// Isolated Checkbox
const TermsCheckbox = React.memo(() => {
  const { field, fieldState } = useController({ name: 'acceptedTerms' })
  console.log(99973, 'Rendering the text input field of', field)
  return (
    <FormControl isInvalid={!!fieldState.error}>
      <Checkbox {...field} isChecked={field.value}>I accept the terms and conditions</Checkbox>
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  )
})

// Gender Radio Group
const GenderInput = React.memo(() => {
  const { field, fieldState } = useController({ name: 'gender' })
  console.log(99985, 'Rendering the radio group field of', field)
  return (
    <FormControl isInvalid={!!fieldState.error}>
      <FormLabel>Gender</FormLabel>
      <RadioGroup {...field} onChange={field.onChange} value={field.value}>
        <HStack spacing={4}>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </HStack>
      </RadioGroup>
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  )
})

const UserForm2: React.FC = () => {
  usePageTracking()

  const methods = useForm<IFormInput>({
    resolver: yupResolver(schema) as any,
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      gender: '',
      country: '',
      state: '',
      acceptedTerms: false,
    }
  })

  const { handleSubmit, watch, setValue, control, formState } = methods
  const country = watch('country')
  const prevControl = usePrevious(control)
  console.log(9999120, formState)
  console.log(9999333120, prevControl === control)
  console.log(9999121, prevControl?.getFieldState('name'))
  console.log(9999122, control?.getFieldState('name'))

  React.useEffect(() => {
    if (country !== 'usa') setValue('state', '')
  }, [country, setValue])

  const onSubmit = (data: IFormInput) => {
    console.log('Form Data:', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box borderWidth="1px" borderColor="gray.100" m={6} borderRadius="lg">
          <VStack spacing={4} p={6} align="stretch" w="100%">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <GridItem><TextInput name="name" label="Name" /></GridItem>
              <GridItem><TextInput name="email" label="Email" type="email" /></GridItem>
              <GridItem><TextInput name="age" label="Age" type="number" /></GridItem>
              <GridItem><GenderInput /></GridItem>
              <GridItem>
                <SelectInput
                  name="country"
                  label="Country"
                  options={[
                    { label: 'USA', value: 'usa' },
                    { label: 'Canada', value: 'canada' },
                    { label: 'UK', value: 'uk' },
                    { label: 'Australia', value: 'australia' },
                  ]}
                />
              </GridItem>

              {country === 'usa' && (
                <GridItem>
                  <SelectInput
                    name="state"
                    label="State"
                    options={statesUSA}
                  />
                </GridItem>
              )}

              <GridItem colSpan={3}><TermsCheckbox /></GridItem>
              <GridItem colSpan={3}>
                <Flex justify="flex-start">
                  <Button type="submit" colorScheme="teal" width="100px">Submit</Button>
                </Flex>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </Box>
      </form>
    </FormProvider>
  )
}

export default UserForm2
