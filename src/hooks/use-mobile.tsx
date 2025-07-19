import * as React from "react"

// Breakpoints matching Tailwind config
const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Hook để kiểm tra breakpoint cụ thể
export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isActive, setIsActive] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`)
    const onChange = () => {
      setIsActive(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setIsActive(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return isActive
}

// Hook để lấy kích thước màn hình hiện tại
export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<{
    width: number
    height: number
    breakpoint: keyof typeof BREAKPOINTS | 'mobile'
  }>({
    width: 0,
    height: 0,
    breakpoint: 'mobile'
  })

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      let breakpoint: keyof typeof BREAKPOINTS | 'mobile' = 'mobile'
      
      if (width >= BREAKPOINTS['2xl']) breakpoint = '2xl'
      else if (width >= BREAKPOINTS.xl) breakpoint = 'xl'
      else if (width >= BREAKPOINTS.lg) breakpoint = 'lg'
      else if (width >= BREAKPOINTS.md) breakpoint = 'md'
      else if (width >= BREAKPOINTS.sm) breakpoint = 'sm'
      else if (width >= BREAKPOINTS.xs) breakpoint = 'xs'
      
      setScreenSize({ width, height, breakpoint })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  return screenSize
}
