export async function uploadFileViaAPI(file: File, folder: string): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
} 