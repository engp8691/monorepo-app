import React, { ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render shows fallback UI
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    // Log the error (can send to monitoring service)
    console.error('ErrorBoundary caught an error:', error, info)
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback || <h2>Something went wrong.</h2>
    }

    return this.props.children
  }
}
