import { ChangeEvent, useState } from 'react'

const FormWithValidation = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({ name: '', email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, field: string) => {
    const { name, value } = evt.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = (): { [key: string]: string } => {
    let error = ''
    const errors = { name: '', email: '', password: '' }

    for (const key of Object.keys(formData)) {
      if (key === 'name') {
        error = 'Name is required'
        if (formData.name && formData.name.length > 0) {
          error = ''
        }
        errors.name = error
      }

      if (key === 'email') {
        error = 'Email is invalid'
        if (formData.email && /(\S+)\@(\S+)\.(\S+)/gm.test(formData.email)) {
          error = ''
        }
        errors.email = error
      }

      if (key === 'password') {
        error = 'Password is too weak'
        if (formData.password && formData.password.length > 6) {
          error = ''
        }
        errors.password = error
      }
    }

    return errors
  }

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    const validationErrors = validateForm()
    for (const key in validationErrors) {
      if (validationErrors[key]) {
        setErrors(validationErrors)
        setSubmitted(false)
        return
      }
    }

    setSubmitted(true)
  }

  return submitted ? (
    <div>
      <div><label style={{ margin: '16px' }}>Name:</label><span>{formData.name}</span></div>
      <div><label style={{ margin: '16px' }}>Email:</label><span>{formData.email}</span></div>
      <div><label style={{ margin: '16px' }}>Password:</label><span>{formData.password}</span></div>
    </div>
  ) : (
    <form>
      <div>
        <label>Name</label>
        <input type='text' value={formData.name} name='name' onChange={(evt) => handleChange(evt, 'name')} />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>

      <div>
        <label>Email</label>
        <input type='text' value={formData.email} name='email' onChange={(evt) => handleChange(evt, 'email')} />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      <div>
        <label>Password</label>
        <input type='password' value={formData.password} name='password' onChange={(evt) => handleChange(evt, 'password')} />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default FormWithValidation