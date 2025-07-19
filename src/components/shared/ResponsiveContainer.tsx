import React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  centered?: boolean
}

const maxWidthClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full'
}

const paddingClasses = {
  none: '',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12'
}

export default function ResponsiveContainer({
  children,
  className,
  as: Component = 'div',
  maxWidth = 'xl',
  padding = 'md',
  centered = true
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </Component>
  )
}

// Container cho sections
export function SectionContainer({ 
  children, 
  className,
  ...props 
}: ResponsiveContainerProps) {
  return (
    <ResponsiveContainer
      maxWidth="full"
      padding="lg"
      className={cn('py-12 sm:py-16 lg:py-24', className)}
      {...props}
    >
      {children}
    </ResponsiveContainer>
  )
}

// Container cho content
export function ContentContainer({ 
  children, 
  className,
  ...props 
}: ResponsiveContainerProps) {
  return (
    <ResponsiveContainer
      maxWidth="2xl"
      padding="md"
      className={cn('py-8 sm:py-12', className)}
      {...props}
    >
      {children}
    </ResponsiveContainer>
  )
} 