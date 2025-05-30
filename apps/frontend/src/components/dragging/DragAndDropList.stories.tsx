import type { Meta, StoryObj } from '@storybook/react'
import { DragAndDropList } from './DragAndDropList'

const meta: Meta<typeof DragAndDropList> = {
  title: 'Example/DragAndDropList',
  component: DragAndDropList
}

export default meta

type Story = StoryObj<typeof DragAndDropList>;
export const Default: Story = {}