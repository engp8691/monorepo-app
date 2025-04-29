import React from 'react'
import { useForm } from 'react-hook-form'
import { ChakraProvider, Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Select, Checkbox, RadioGroup, Radio, VStack, HStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { theme } from '../../theme/theme'

interface IFormInput {
  name: string;
  email: string;
  age: number;
  gender: string;
  country: string;
  acceptedTerms: boolean;
}

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  age: Yup
    .number()
    .transform((value, originalValue) => {
      console.log(999992553, value, originalValue)
      return originalValue === '' ? undefined : value
    })
    .required('Age is required')
    .typeError('Age must be a valid number')
    .min(18, 'You must be at least 18 years old')
    .test('is-possible', 'Age must be less than 199', (value) => {
      if (value === undefined) return true
      return value < 199
    }),
  gender: Yup.string().required('Gender is required'),
  country: Yup.string().required('Country is required'),
  acceptedTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
}).required()

const UserForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: IFormInput) => {
    console.log(data)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="md" mx="auto" mt="10" p="5" borderWidth="1px" borderRadius="lg">
        <form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="the-form-test-id">
          <VStack spacing={4} align="flex-start">
            {/* Name Input */}
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                {...register('name')}
                data-testid="name"
              />
              <FormErrorMessage role="alert">{errors.name?.message}</FormErrorMessage>
            </FormControl>

            {/* Email Input */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email')}
                data-testid="email"
              />
              <FormErrorMessage role="alert">{errors.email?.message}</FormErrorMessage>
            </FormControl>

            {/* Age Input */}
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

            <FormControl isInvalid={!!errors.gender}>
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-label"
                onChange={(value) => setValue('gender', value, { shouldValidate: true })}
                value={watch('gender')}
              >
                <HStack spacing={5}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </HStack>
              </RadioGroup>
              <FormErrorMessage role="alert">{errors.gender?.message}</FormErrorMessage>
            </FormControl>

            {/* Country Select */}
            <FormControl isInvalid={!!errors.country}>
              <FormLabel htmlFor="country">Country</FormLabel>
              <Select
                id="country"
                placeholder="Select country"
                {...register('country')}
              >
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
              </Select>
              <FormErrorMessage role="alert">{errors.country?.message}</FormErrorMessage>
            </FormControl>

            {/* Terms Checkbox */}
            <FormControl isInvalid={!!errors.acceptedTerms}>
              <HStack>
                <Checkbox
                  id="acceptedTerms"
                  data-testid="acceptedTerms"
                  {...register('acceptedTerms')}
                >
                  I accept the terms and conditions
                </Checkbox>
              </HStack>
              <FormErrorMessage role="alert">{errors.acceptedTerms?.message}</FormErrorMessage>
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" colorScheme="teal" width="full">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  )
}

export default UserForm
