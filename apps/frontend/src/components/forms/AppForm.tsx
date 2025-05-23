import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// 1. Define form value types
interface FormValues {
  name: string
  email: string
  age: number
  sex: 'Male' | 'Female'
  state: string
}

// 2. Yup validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(18, 'Age must be at least 18')
    .max(80, 'Age must be at most 80'),
  sex: yup.string().oneOf(['Male', 'Female']).required('Sex is required'),
  state: yup.string().required('State is required'),
})

const AppForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('✅ Form Data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <div style={styles.field}>
        <label>Name:</label>
        <input {...register('name')} style={{
          borderWidth: '1px',
        }} />
        {errors.name && <p style={styles.error}>{errors.name.message}</p>}
      </div>

      <div style={styles.field}>
        <label>Email:</label>
        <input type="email" {...register('email')} style={{
          borderWidth: '1px',
        }} />
        {errors.email && <p style={styles.error}>{errors.email.message}</p>}
      </div>

      <div style={styles.field}>
        <label>Age:</label>
        <input type="number" {...register('age')} style={{
          borderWidth: '1px',
        }} />
        {errors.age && <p style={styles.error}>{errors.age.message}</p>}
      </div>

      <div style={styles.field}>
        <label>Sex:</label>
        <label>
          <input type="radio" value="Male" {...register('sex')} /> Male
        </label>
        <label>
          <input type="radio" value="Female" {...register('sex')} /> Female
        </label>
        {errors.sex && <p style={styles.error}>{errors.sex.message}</p>}
      </div>

      <div style={styles.field}>
        <label>State:</label>
        <select {...register('state')} defaultValue="" style={{
          borderWidth: '1px',
        }}>
          <option value="" disabled>
            Select your state
          </option>
          <option value="CA">California</option>
          <option value="NY">New York</option>
          <option value="TX">Texas</option>
          <option value="WA">Washington</option>
        </select>
        {errors.state && <p style={styles.error}>{errors.state.message}</p>}
      </div>

      <button type="submit" style={styles.button}>
        Submit
      </button>
    </form>
  )
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial',
  },
  field: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '0.25rem',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}

export default AppForm
