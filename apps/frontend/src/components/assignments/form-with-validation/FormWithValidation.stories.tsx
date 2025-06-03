import { Meta, StoryObj } from '@storybook/react'
import FormWithValidation from './FormWithValidation'

const meta: Meta<typeof FormWithValidation> = {
  title: 'Forms/FormWithValidation',
  component: FormWithValidation,
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
}

export default meta

type Story = StoryObj<typeof FormWithValidation>

export const Default: Story = {}