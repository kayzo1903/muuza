export const convertFileToBase64 = (
  file: File, 
  options: { 
    maxSizeMB?: number; 
    allowedTypes?: string[] 
  } = {}
): Promise<string> => {
  const { maxSizeMB = 2, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] } = options;
  
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      reject(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
      return;
    }
    
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      reject(new Error(`File size must be less than ${maxSizeMB}MB`));
      return;
    }
    
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      
      // Additional validation of the base64 string
      if (!result.startsWith('data:image/')) {
        reject(new Error('Invalid file content'));
        return;
      }
      
      resolve(result);
    };
    reader.onerror = error => reject(new Error(`File reading failed: ${error}`));
  });
};