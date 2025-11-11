import { SECRET_COOKIE_KEY } from '$env/static/private'

// Generate or derive an encryption key
async function getEncryptionKey(): Promise<CryptoKey> {

	// Debug logging for production
	if (typeof SECRET_COOKIE_KEY === 'undefined') {
		console.error('SECRET_COOKIE_KEY is undefined!');
		throw new Error('SECRET_COOKIE_KEY environment variable is not set');
	}

	console.log('SECRET_COOKIE_KEY length:', SECRET_COOKIE_KEY.length);
	console.log('SECRET_COOKIE_KEY first 10 chars:', SECRET_COOKIE_KEY.substring(0, 10));

	// Decode base64 key to get actual key material
	let keyData;
	try {
		keyData = Uint8Array.from(atob(SECRET_COOKIE_KEY), c => c.charCodeAt(0));
		console.log('Successfully decoded base64, length:', keyData.length);
	} catch (error) {
		console.log('Base64 decode failed, using string encoding:', error);
		// If not valid base64, use the string directly
		keyData = new TextEncoder().encode(SECRET_COOKIE_KEY);
	}

	// Ensure we have exactly 32 bytes for AES-256
	const normalizedKey = new Uint8Array(32);
	if (keyData.length >= 32) {
		normalizedKey.set(keyData.slice(0, 32));
	} else {
		normalizedKey.set(keyData);
		// Pad with zeros if too short
	}

	console.log('Final normalized key length:', normalizedKey.length);

	return crypto.subtle.importKey(
		'raw',
		normalizedKey,
		{ name: 'AES-GCM', length: 256 },
		false,
		['encrypt', 'decrypt']
	);
}

export async function encrypt(data: string): Promise<string> {
	const key = await getEncryptionKey();
	const encoder = new TextEncoder();
	const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector

	const encryptedData = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv },
		key,
		encoder.encode(data)
	);

	// Combine IV and encrypted data
	const combined = new Uint8Array(iv.length + encryptedData.byteLength);
	combined.set(iv, 0);
	combined.set(new Uint8Array(encryptedData), iv.length);

	// Convert to base64 for cookie storage
	return btoa(String.fromCharCode(...combined));
}

export async function decrypt(encryptedString: string): Promise<string> {
	try {
		const key = await getEncryptionKey();

		// Decode from base64
		const combined = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));

		// Extract IV and encrypted data
		const iv = combined.slice(0, 12);
		const encryptedData = combined.slice(12);

		const decryptedData = await crypto.subtle.decrypt(
			{ name: 'AES-GCM', iv },
			key,
			encryptedData
		);

		return new TextDecoder().decode(decryptedData);
	} catch (error) {
		throw new Error('Decryption failed');
	}
}
