# 🎯 Responsive Design Best Practices

## 📱 Breakpoints

Dự án sử dụng các breakpoints sau:

```css
xs: 475px   /* Extra small devices */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## 🛠️ Tools & Components

### 1. Hooks

```typescript
// Kiểm tra mobile
const isMobile = useIsMobile()

// Kiểm tra breakpoint cụ thể
const isLarge = useBreakpoint('lg')

// Lấy kích thước màn hình
const { width, height, breakpoint } = useScreenSize()
```

### 2. Containers

```typescript
// Container cơ bản
<ResponsiveContainer maxWidth="xl" padding="md">
  Content here
</ResponsiveContainer>

// Container cho sections
<SectionContainer>
  Section content
</SectionContainer>

// Container cho content
<ContentContainer>
  Main content
</ContentContainer>
```

### 3. Images

```typescript
// Image responsive cơ bản
<ResponsiveImage src="/image.jpg" alt="Description" />

// Hero image
<HeroImage src="/hero.jpg" alt="Hero" />

// Card image
<CardImage src="/card.jpg" alt="Card" />

// Avatar image
<AvatarImage src="/avatar.jpg" alt="Avatar" />
```

## 🎨 Utility Classes

### Typography
```css
.text-responsive-xs    /* xs → sm → base */
.text-responsive-sm    /* sm → base → lg */
.text-responsive-base  /* base → lg → xl */
.text-responsive-lg    /* lg → xl → 2xl */
.text-responsive-xl    /* xl → 2xl → 3xl */
.text-responsive-2xl   /* 2xl → 3xl → 4xl */
.text-responsive-3xl   /* 3xl → 4xl → 5xl */
.text-responsive-4xl   /* 4xl → 5xl → 6xl */
```

### Spacing
```css
.section-padding    /* py-8 → py-12 → py-16 → py-20 → py-24 */
.container-padding  /* px-4 → px-6 → px-8 → px-12 → px-16 */
```

### Grid
```css
.grid-responsive-1  /* 1 column */
.grid-responsive-2  /* 1 → 2 columns */
.grid-responsive-3  /* 1 → 2 → 3 columns */
.grid-responsive-4  /* 1 → 2 → 4 columns */
```

### Flex
```css
.flex-responsive-col  /* column → row */
.flex-responsive-row  /* row → column */
```

### Visibility
```css
.hide-mobile    /* hidden on mobile, visible on sm+ */
.show-mobile    /* visible on mobile, hidden on sm+ */
.hide-tablet    /* hidden on tablet, visible on md+ */
.show-tablet    /* visible on tablet, hidden on md+ */
```

### Buttons
```css
.btn-responsive    /* full width on mobile, auto on sm+ */
.btn-responsive-sm /* smaller padding on mobile */
.btn-responsive-lg /* larger padding on mobile */
```

## 📋 Best Practices

### 1. Mobile-First Approach
```typescript
// ✅ Tốt - Mobile first
<div className="text-sm md:text-base lg:text-lg">
  Content
</div>

// ❌ Không tốt - Desktop first
<div className="text-lg md:text-base sm:text-sm">
  Content
</div>
```

### 2. Responsive Typography
```typescript
// ✅ Sử dụng utility classes
<h1 className="text-responsive-3xl font-bold">
  Heading
</h1>

// ✅ Hoặc Tailwind responsive
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Heading
</h1>
```

### 3. Responsive Grid
```typescript
// ✅ Sử dụng utility classes
<div className="grid-responsive-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// ✅ Hoặc Tailwind responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### 4. Responsive Images
```typescript
// ✅ Sử dụng ResponsiveImage component
<ResponsiveImage
  src="/image.jpg"
  alt="Description"
  aspectRatio="video"
  objectFit="cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ✅ Hoặc Next.js Image với sizes
<Image
  src="/image.jpg"
  alt="Description"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 5. Responsive Spacing
```typescript
// ✅ Sử dụng utility classes
<section className="section-padding">
  <div className="container-padding">
    Content
  </div>
</section>

// ✅ Hoặc Tailwind responsive
<section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
  <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
    Content
  </div>
</section>
```

### 6. Conditional Rendering
```typescript
// ✅ Sử dụng hooks
const isMobile = useIsMobile()

return (
  <div>
    {isMobile ? <MobileMenu /> : <DesktopMenu />}
  </div>
)

// ✅ Hoặc CSS classes
<div>
  <MobileMenu className="show-mobile" />
  <DesktopMenu className="hide-mobile" />
</div>
```

### 7. Touch-Friendly Elements
```typescript
// ✅ Minimum touch target size
<button className="min-h-[44px] min-w-[44px] px-4 py-2">
  Button
</button>

// ✅ Responsive button
<button className="btn-responsive btn-responsive-lg">
  Button
</button>
```

## 🧪 Testing

### 1. Browser DevTools
- Chrome DevTools: Device toolbar
- Firefox: Responsive Design Mode
- Safari: Develop > Enter Responsive Design Mode

### 2. Common Test Sizes
```css
/* Mobile */
320px, 375px, 414px, 480px

/* Tablet */
768px, 820px, 834px, 1024px

/* Desktop */
1280px, 1366px, 1440px, 1920px
```

### 3. Orientation Testing
- Portrait: 375x667, 414x896
- Landscape: 667x375, 896x414

## 🚀 Performance Tips

### 1. Image Optimization
```typescript
// ✅ Sử dụng Next.js Image
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={true} // For above-the-fold images
/>
```

### 2. Lazy Loading
```typescript
// ✅ Lazy load components
const LazyComponent = dynamic(() => import('./Component'), {
  loading: () => <Skeleton />
})
```

### 3. Conditional Loading
```typescript
// ✅ Load heavy components only on desktop
const isDesktop = useBreakpoint('lg')

return (
  <div>
    {isDesktop && <HeavyDesktopComponent />}
  </div>
)
```

## 📱 Mobile-Specific Considerations

### 1. Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 2. Touch Interactions
```css
/* Disable hover on touch devices */
@media (hover: none) {
  .hover-effect {
    display: none;
  }
}
```

### 3. Safe Areas (iOS)
```css
/* Support for iPhone X+ safe areas */
.safe-area {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
}
```

## 🎨 Design System Integration

### 1. Consistent Spacing
```typescript
// Sử dụng design tokens
const spacing = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
}
```

### 2. Component Variants
```typescript
// Responsive component variants
const cardVariants = {
  mobile: 'p-4 text-sm',
  tablet: 'p-6 text-base',
  desktop: 'p-8 text-lg'
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Content Overflow**
```css
/* Fix horizontal scroll */
.container {
  overflow-x: hidden;
  width: 100%;
}
```

2. **Text Wrapping**
```css
/* Prevent text overflow */
.text-container {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

3. **Image Scaling**
```css
/* Prevent image distortion */
img {
  max-width: 100%;
  height: auto;
}
```

### Debug Tools

```css
/* Debug responsive layout */
.debug * {
  outline: 1px solid red;
}

.debug-grid {
  background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## 📚 Resources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Web.dev Responsive Images](https://web.dev/fast/#optimize-your-images) 