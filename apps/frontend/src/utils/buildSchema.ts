// utils/schemaBuilder.ts
import * as yup from 'yup'

export function buildDynamicSchema(
  fields: { name: string; required?: boolean }[]
) {
  const shape: Record<string, any> = {}

  fields.forEach((field) => {
    let schema = yup.string()
    if (field.required) {
      schema = schema.required(`${field.name} is required`)
    }
    shape[field.name] = schema
  })

  return yup.object().shape(shape)
}
