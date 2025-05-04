import { FC } from 'react'

export const BuggyComponent: FC = () => {
  throw new Error('Crash!')
  return <div>This will never render</div>
}