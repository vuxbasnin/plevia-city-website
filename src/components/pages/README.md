# Pages Components Structure

Cấu trúc components cho các trang chính của website Plevia City.

## Cấu trúc thư mục

```
src/components/pages/
├── IoTPage/
│   ├── IoTPage.tsx          # Component chính (Server Component)
│   ├── IoTClientComponents.tsx  # Client Components cho animations/video
│   ├── data.ts              # Data cho IoT sections
│   └── index.tsx            # Export file
├── LifestylePage/
│   ├── LifestylePage.tsx    # Component chính (Server Component)
│   ├── LifestyleContent.tsx # Client Components
│   └── index.tsx            # Export file
├── StorylinePage/
│   ├── StorylinePage.tsx    # Component chính (Server Component)
│   ├── StorylineContent.tsx # Client Components
│   └── index.tsx            # Export file
├── LocationPage/
│   ├── LocationPage.tsx     # Component chính (Server Component)
│   └── index.tsx            # Export file
├── NewsPage/
│   ├── NewsPage.tsx         # Component chính (Server Component)
│   ├── NewsContent.tsx      # Client Components
│   └── index.tsx            # Export file
├── MemberBenefitsPage/
│   ├── MemberBenefitsPage.tsx    # Component chính (Server Component)
│   ├── MemberBenefitsContent.tsx # Client Components
│   └── index.tsx                 # Export file
└── README.md               # File này
```

## Nguyên tắc thiết kế

### 1. **Separation of Concerns**
- **Server Components**: Chứa SEO content và static rendering
- **Client Components**: Chứa interactive features và animations

### 2. **SEO Optimization**
- Mỗi page có SEO content trong `sr-only` div
- Fallback content trong `noscript` tag
- Server-side rendering cho search engines

### 3. **Progressive Enhancement**
- Base content render trên server
- Enhanced features load trên client
- Graceful degradation khi JavaScript disabled

### 4. **File Structure**
- `PageName.tsx`: Main component (Server)
- `PageNameContent.tsx`: Interactive content (Client)
- `data.ts`: Static data (nếu cần)
- `index.tsx`: Clean export

## Usage

```tsx
// Trong app/page.tsx
import IoTPage from "@/components/pages/IoTPage";

export default function Page() {
  return (
    <PageLayout>
      <IoTPage />
    </PageLayout>
  );
}
```

## Benefits

1. **Maintainability**: Code được tổ chức rõ ràng
2. **SEO**: Server-side rendering cho search engines
3. **Performance**: Lazy loading cho client components
4. **Scalability**: Dễ dàng thêm pages mới
5. **Reusability**: Components có thể tái sử dụng
