export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

const STORAGE_KEY_CLOUDINARY = 'sc_pet_watch_cloudinary_config_v1';

export const DEFAULT_CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME || '',
  apiKey: (import.meta as any).env?.VITE_CLOUDINARY_API_KEY || '392472952221462',
  apiSecret: (import.meta as any).env?.VITE_CLOUDINARY_API_SECRET || 'Ac93DFmI7Mqfpne_l6wSsfjFjOE'
};

export function getStoredCloudinaryConfig(): CloudinaryConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLOUDINARY);
    if (!raw) return DEFAULT_CLOUDINARY_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      cloudName: parsed.cloudName || DEFAULT_CLOUDINARY_CONFIG.cloudName,
      apiKey: parsed.apiKey || DEFAULT_CLOUDINARY_CONFIG.apiKey,
      apiSecret: parsed.apiSecret || DEFAULT_CLOUDINARY_CONFIG.apiSecret
    };
  } catch {
    return DEFAULT_CLOUDINARY_CONFIG;
  }
}

export function saveStoredCloudinaryConfig(config: Partial<CloudinaryConfig>): void {
  try {
    const current = getStoredCloudinaryConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY_CLOUDINARY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save Cloudinary config:', err);
  }
}

/**
 * Computes SHA-1 signature using browser Web Crypto API
 */
async function generateSha1Signature(toSign: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(toSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface CloudinaryUploadResult {
  url: string;
  uploadedToCloud: boolean;
  warning?: string;
}

/**
 * Uploads an image to Cloudinary using signed upload
 */
export async function uploadToCloudinary(
  file: File | Blob,
  fallbackDataUrl: string
): Promise<CloudinaryUploadResult> {
  const config = getStoredCloudinaryConfig();

  if (!config.cloudName || config.cloudName.trim() === '') {
    return {
      url: fallbackDataUrl,
      uploadedToCloud: false,
      warning: 'Cloudinary Cloud Name not set. Photo preserved locally in high resolution.'
    };
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);
    // Cloudinary signature parameters format: sorted query params + api_secret (without &)
    const stringToSign = `timestamp=${timestamp}${config.apiSecret}`;
    const signature = await generateSha1Signature(stringToSign);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', config.apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    const endpoint = `https://api.cloudinary.com/v1_1/${encodeURIComponent(config.cloudName.trim())}/image/upload`;

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.warn('Cloudinary upload response notice:', data);
      return {
        url: fallbackDataUrl,
        uploadedToCloud: false,
        warning: `Cloudinary notice: ${data.error?.message || 'Upload failed'}. Photo preserved locally.`
      };
    }

    return {
      url: data.secure_url || data.url,
      uploadedToCloud: true
    };
  } catch (err) {
    console.error('Cloudinary upload network error:', err);
    return {
      url: fallbackDataUrl,
      uploadedToCloud: false,
      warning: 'Could not reach Cloudinary. Photo saved locally in high quality.'
    };
  }
}
