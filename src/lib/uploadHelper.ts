export async function uploadFileViaAPI(file: File, type: string, createdBy: string = 'admin'): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('createdBy', createdBy);

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error((errorData as any).error || 'Upload failed');
    }

    const result = await response.json();
    return (result as any).url as string;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}