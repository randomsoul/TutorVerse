export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get('lat'));
  const lon = Number(searchParams.get('lon'));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return Response.json({ error: 'Valid latitude and longitude are required.' }, { status: 400 });
  }

  const key = process.env.LOCATIONIQ_API_KEY;
  if (!key) {
    return Response.json({ error: 'Location service is not configured.' }, { status: 503 });
  }

  const url = new URL('https://us1.locationiq.com/v1/reverse.php');
  url.searchParams.set('key', key);
  url.searchParams.set('lat', String(lat));
  url.searchParams.set('lon', String(lon));
  url.searchParams.set('format', 'json');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('accept-language', 'en');

  try {
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) {
      return Response.json({ error: 'Location could not be resolved.' }, { status: response.status });
    }

    const address = data?.address ?? {};
    return Response.json({
      display_name: typeof data?.display_name === 'string' ? data.display_name : '',
      city: address.city || address.town || address.municipality || address.village || '',
      area: address.suburb || address.neighbourhood || address.quarter || address.city_district || '',
      state: address.state || '',
      pincode: address.postcode || '',
    });
  } catch {
    return Response.json({ error: 'Location service is temporarily unavailable.' }, { status: 502 });
  }
}
