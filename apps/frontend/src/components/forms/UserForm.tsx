import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Button, FormControl, FormLabel, Input, FormErrorMessage, Select,
  Checkbox, RadioGroup, Radio, VStack, HStack, SimpleGrid, Box, Flex, GridItem
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const statesUSA = [
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
  { label: 'Florida', value: 'FL' },
  { label: 'Illinois', value: 'IL' },
]

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  age: Yup.number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .required('Age is required')
    .typeError('Age must be a valid number')
    .min(18, 'You must be at least 18 years old')
    .test('is-possible', 'Age must be less than 199', (value) => {
      if (value === undefined) return true
      return value < 199
    }),
  gender: Yup.string().required('Gender is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().when('country', {
    is: (val: string) => val === 'usa',
    then: (schema) => schema.required('State is required when country is USA'),
    otherwise: (schema) => schema.optional(),
  }),
  acceptedTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
}).required()

type IFormInput = Yup.InferType<typeof schema>

const UserForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<IFormInput>({
    resolver: yupResolver(schema) as any,
  })
  const { t } = useTranslation()


  const country = watch('country')

  React.useEffect(() => {
    if (country !== 'usa') {
      setValue('state', '')
    }
  }, [country, setValue])

  const onSubmit = (data: IFormInput) => {
    console.log('Form Data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="the-form-test-id">
      <Box borderWidth="1px" borderColor="gray.100" m={6} borderRadius="lg">
        <VStack spacing={4} p={6} align="stretch" w="100%">
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={4}
            w="100%"
          >
            <GridItem>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">{t('userForm.name')}</FormLabel>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  data-testid="name"
                />
                <FormErrorMessage role="alert">{errors.name?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">{t('userForm.email')}</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  data-testid="email"
                />
                <FormErrorMessage role="alert">{errors.email?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.age}>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Input
                  id="age"
                  type="number"
                  {...register('age')}
                  data-testid="age"
                />
                <FormErrorMessage role="alert">{errors.age?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.gender}>
                <FormLabel id="gender-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="gender-label"
                  onChange={(value) => setValue('gender', value, { shouldValidate: true })}
                  value={watch('gender')}
                >
                  <HStack spacing={4}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="other">Other</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage role="alert">{errors.gender?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.country}>
                <FormLabel htmlFor="country">Country</FormLabel>
                <Select id="country" placeholder="Select country" {...register('country')}>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="australia">Australia</option>
                </Select>
                <FormErrorMessage role="alert">{errors.country?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>

            {country === 'usa' && (
              <GridItem>
                <FormControl isInvalid={!!errors.state}>
                  <FormLabel htmlFor="state">State</FormLabel>
                  <Select id="state" placeholder="Select state" {...register('state')}>
                    {statesUSA.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage role="alert">{errors.state?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>
            )}

            <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
              <FormControl pt={4} isInvalid={!!errors.acceptedTerms}>
                <FormLabel htmlFor="acceptedTerms" id="acceptedTerms-label">Terms and conditions</FormLabel>
                <Checkbox id="acceptedTerms" data-testid="acceptedTerms" {...register('acceptedTerms')}>
                  I accept the terms and conditions
                </Checkbox>
                <FormErrorMessage role="alert">{errors.acceptedTerms?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
              <Flex justify={{ base: 'flex-end', md: 'flex-start' }}>
                <Button type="submit" colorScheme="teal" width="100px">
                  Submit
                </Button>
              </Flex>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Box>
    </form>
  )
}

export default UserForm
