
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

const DynamicLucideIcon = ({ name, className, ...props }: { name: string; className?: string } & LucideProps) => {
    if (typeof name !== 'string' || name.trim() === "") {
        const FallbackIcon = LucideIcons.HelpCircle;
        // Pass props here as FallbackIcon is a Lucide component
        return <FallbackIcon className={cn("text-muted-foreground", className)} {...props} />;
    }
    if (name.startsWith('http://') || name.startsWith('https://')) {
        // eslint-disable-next-line @next/next/no-img-element
        // Do NOT spread ...props here as they are LucideProps/SVGProps, not ImgHTMLAttributes
        return <img src={name} alt="Custom icon" className={cn("w-full h-full object-contain", className)} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }} />;
    }
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) {
        const FallbackIcon = LucideIcons.HelpCircle;
        console.warn(`DynamicLucideIcon: Icon '${name}' not found. Defaulting to HelpCircle.`);
        // Pass props here as FallbackIcon is a Lucide component
        return <FallbackIcon className={cn("text-muted-foreground", className)} {...props} />;
    }
    // Pass props here as IconComponent is a Lucide component
    return <IconComponent className={className} {...props} />;
};

export default DynamicLucideIcon;
