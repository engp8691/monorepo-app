// DynamicForm.tsx
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { buildDynamicSchema } from '../../utils/buildSchema'

type FieldConfig = { name: string; required?: boolean };

const defaultFields: FieldConfig[] = [
  { name: 'firstName', required: true },
  { name: 'lastName', required: false },
]

export default function DynamicForm() {
  const [fields, setFields] = React.useState<FieldConfig[]>(defaultFields)

  const schema = buildDynamicSchema(fields)
  const methods = useForm({ resolver: yupResolver(schema), mode: 'onBlur' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = (data: any) => {
    console.log('✅ Form Data:', data)
  }

  const addField = () => {
    const newField = { name: `field${fields.length + 1}`, required: true }
    setFields([...fields, newField])
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.name}>
            <label>{field.name}</label>
            <input {...register(field.name)} />
            {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]?.message as string}</p>}
          </div>
        ))}

        <button type="button" onClick={addField}>Add Field</button>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}
