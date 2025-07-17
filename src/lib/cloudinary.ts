export const CLOUDINARY = {
  CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string,
  UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
} as const;
