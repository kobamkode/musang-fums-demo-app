import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { downloadFixedStation } from '$lib/api';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { location, panel, start, end } = await request.json();
	const result = await downloadFixedStation(locals, location, panel, start, end)

	// Handle error case
	if ('error' in result) {
		return json(result, { status: result.error?.status });
	}

	// Get the blob from the response
	const blob = await result.response.blob();

	// Return the blob with proper headers
	return new Response(blob, {
		headers: {
			'Content-Type': result.response.headers.get('Content-Type') || 'application/octet-stream',
			'Content-Disposition': `attachment; filename="${result.filename}"`,
			'Content-Length': blob.size.toString()
		}
	});
};
