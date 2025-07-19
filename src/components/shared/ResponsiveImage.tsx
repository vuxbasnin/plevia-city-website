import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  width?: number
  height?: number
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  aspectRatio?: 'square' | 'video' | 'auto' | 'custom'
  customAspectRatio?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  auto: 'aspect-auto',
  custom: ''
}

const objectFitClasses = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down'
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  width,
  height,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  aspectRatio = 'auto',
  customAspectRatio,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  onLoad,
  onError
}: ResponsiveImageProps) {
  const aspectRatioClass = aspectRatio === 'custom' 
    ? customAspectRatio 
    : aspectRatioClasses[aspectRatio]

  const objectFitClass = objectFitClasses[objectFit]

  return (
    <div className={cn(
      'relative overflow-hidden',
      aspectRatioClass,
      className
    )}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          'image-responsive',
          objectFitClass
        )}
        style={{
          objectPosition: objectPosition
        }}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  )
}

// Component cho hero images
export function HeroImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      aspectRatio="video"
      objectFit="cover"
      objectPosition="center"
      priority={true}
      sizes="100vw"
      className={cn('w-full h-full', props.className)}
    />
  )
}

// Component cho card images
export function CardImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      aspectRatio="square"
      objectFit="cover"
      objectPosition="center"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={cn('rounded-lg', props.className)}
    />
  )
}

// Component cho avatar images
export function AvatarImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      aspectRatio="square"
      objectFit="cover"
      objectPosition="center"
      sizes="(max-width: 768px) 60px, 80px"
      className={cn('rounded-full', props.className)}
    />
  )
} 