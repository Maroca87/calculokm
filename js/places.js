/**
 * places.js - Catálogo offline de lugares frecuentes de Costa Rica + Geocodificación y cálculo de distancia
 */

// Lugares frecuentes y cabeceras / hitos clave de Costa Rica (coordenadas WGS84)
export const CR_KEY_PLACES = [
  // San José
  { name: 'San José Centro, San José', lat: 9.9333, lon: -84.0833 },
  { name: 'Calle Los Mota, San José', lat: 9.9250, lon: -84.0950 },
  { name: 'Tecnova Soluciones, San José', lat: 9.9405, lon: -84.0920 },
  { name: 'Zapote, San José', lat: 9.9198, lon: -84.0531 },
  { name: 'San Pedro, Montes de Oca', lat: 9.9328, lon: -84.0519 },
  { name: 'Curridabat, San José', lat: 9.9157, lon: -84.0354 },
  { name: 'Desamparados, San José', lat: 9.8988, lon: -84.0689 },
  { name: 'Escazú Centro, San José', lat: 9.9189, lon: -84.1388 },
  { name: 'Santa Ana, San José', lat: 9.9326, lon: -84.1826 },
  { name: 'Tibás, San José', lat: 9.9575, lon: -84.0825 },
  { name: 'Moravia, San José', lat: 9.9619, lon: -84.0494 },
  { name: 'Guadalupe, Goicoechea', lat: 9.9472, lon: -84.0569 },
  { name: 'Pavas, San José', lat: 9.9489, lon: -84.1319 },
  { name: 'La Uruca, San José', lat: 9.9536, lon: -84.1039 },
  { name: 'Hatillo, San José', lat: 9.9161, lon: -84.0978 },
  { name: 'Pérez Zeledón (San Isidro)', lat: 9.3736, lon: -83.7036 },

  // Alajuela
  { name: 'Alajuela Centro, Alajuela', lat: 10.0163, lon: -84.2116 },
  { name: 'Aeropuerto Juan Santamaría (SJO)', lat: 9.9981, lon: -84.2041 },
  { name: 'El Coyol, Alajuela', lat: 9.9986, lon: -84.2586 },
  { name: 'San Ramón, Alajuela', lat: 10.0872, lon: -84.4703 },
  { name: 'Grecia, Alajuela', lat: 10.0739, lon: -84.3122 },
  { name: 'Palmares, Alajuela', lat: 10.0594, lon: -84.4336 },
  { name: 'Naranjo, Alajuela', lat: 10.0983, lon: -84.3878 },
  { name: 'Atenas, Alajuela', lat: 9.9786, lon: -84.3800 },
  { name: 'Ciudad Quesada (San Carlos)', lat: 10.3238, lon: -84.4283 },
  { name: 'La Fortuna, San Carlos', lat: 10.4709, lon: -84.6453 },

  // Heredia
  { name: 'Heredia Centro, Heredia', lat: 9.9989, lon: -84.1169 },
  { name: 'Barreal de Heredia', lat: 9.9789, lon: -84.1481 },
  { name: 'Belén (San Antonio), Heredia', lat: 9.9814, lon: -84.1844 },
  { name: 'Santo Domingo, Heredia', lat: 9.9806, lon: -84.0894 },
  { name: 'San Rafael, Heredia', lat: 10.0139, lon: -84.1017 },
  { name: 'San Joaquín de Flores, Heredia', lat: 10.0069, lon: -84.1561 },
  { name: 'Lagunilla, Heredia', lat: 9.9800, lon: -84.1292 },
  { name: 'Sarapiquí (Puerto Viejo)', lat: 10.4578, lon: -84.0089 },

  // Cartago
  { name: 'Cartago Centro, Cartago', lat: 9.8644, lon: -83.9194 },
  { name: 'Tres Ríos, La Unión', lat: 9.9078, lon: -83.9875 },
  { name: 'Paraíso, Cartago', lat: 9.8383, lon: -83.8656 },
  { name: 'Turrialba Centro, Cartago', lat: 9.9047, lon: -83.6833 },
  { name: 'Oreamuno, Cartago', lat: 9.8703, lon: -83.9056 },
  { name: 'El Guarco (Tejar), Cartago', lat: 9.8458, lon: -83.9286 },

  // Puntarenas
  { name: 'Puntarenas Centro', lat: 9.9763, lon: -84.8384 },
  { name: 'Esparza, Puntarenas', lat: 9.9947, lon: -84.6653 },
  { name: 'Jacó, Garabito', lat: 9.6150, lon: -84.6297 },
  { name: 'Quepos / Manuel Antonio', lat: 9.4319, lon: -84.1619 },
  { name: 'Golfito, Puntarenas', lat: 8.6361, lon: -83.1664 },
  { name: 'Ciudad Neily (Corredores)', lat: 8.6472, lon: -82.9464 },

  // Guanacaste
  { name: 'Liberia Centro, Guanacaste', lat: 10.6347, lon: -85.4406 },
  { name: 'Nicoya Centro, Guanacaste', lat: 10.1444, lon: -85.4542 },
  { name: 'Cañas, Guanacaste', lat: 10.4311, lon: -85.0978 },
  { name: 'Santa Cruz, Guanacaste', lat: 10.2608, lon: -85.5853 },
  { name: 'Tamarindo, Guanacaste', lat: 10.2994, lon: -85.8397 },

  // Limón
  { name: 'Limón Centro (Puerto Limón)', lat: 9.9907, lon: -83.0360 },
  { name: 'Pococí (Guápiles), Limón', lat: 10.2153, lon: -83.7844 },
  { name: 'Siquirres, Limón', lat: 10.0983, lon: -83.5078 },
  { name: 'Cahuita / Puerto Viejo, Talamanca', lat: 9.6569, lon: -82.7544 }
];

// Cache de búsquedas y coordenadas en memoria
const geocodeCache = new Map();

/**
 * Fórmula de Haversine para calcular distancia ortodrómica en kilómetros
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDistance = R * c;

  // Factor de tortuosidad vial promedio en Costa Rica (1.28x sobre distancia en línea recta)
  const drivingFactor = 1.28;
  const estimatedDrivingKm = straightDistance * drivingFactor;
  return Math.round(estimatedDrivingKm * 10) / 10;
}

/**
 * Busca coincidencias locales o en línea
 * @param {string} query 
 * @returns {Promise<Array<{name: string, lat: number, lon: number}>>}
 */
export async function searchPlaces(query) {
  const q = (query || '').trim().toLowerCase();
  if (q.length < 2) return [];

  // 1. Filtrar primero catálogo local offline
  const localMatches = CR_KEY_PLACES.filter(p => 
    p.name.toLowerCase().includes(q)
  );

  // Si tenemos suficientes coincidencias locales exactas, devolverlas inmediatamente
  if (localMatches.length >= 3) {
    return localMatches.slice(0, 5);
  }

  // 2. Si hay conexión y la búsqueda es más específica, consultar Nominatim de OpenStreetMap (con límites de CR)
  try {
    const cacheKey = 'nominatim_' + q;
    if (geocodeCache.has(cacheKey)) {
      return geocodeCache.get(cacheKey);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2800);

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Costa Rica')}&countrycodes=cr&limit=5&addressdetails=1`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const onlineMatches = data.map(item => ({
        name: item.display_name.split(',').slice(0, 3).join(',').trim(),
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      }));

      // Combinar locales y en línea evitando duplicados
      const combined = [...localMatches];
      for (const item of onlineMatches) {
        if (!combined.some(c => Math.abs(c.lat - item.lat) < 0.005 && Math.abs(c.lon - item.lon) < 0.005)) {
          combined.push(item);
        }
      }
      const results = combined.slice(0, 6);
      geocodeCache.set(cacheKey, results);
      return results;
    }
  } catch (e) {
    // Si falla internet, responder con catálogo local
  }

  return localMatches.slice(0, 5);
}

/**
 * Intenta resolver las coordenadas de un nombre de lugar
 */
export async function resolveCoordinates(placeName) {
  const clean = (placeName || '').trim();
  if (!clean) return null;

  // Buscar en cache
  if (geocodeCache.has(clean)) {
    return geocodeCache.get(clean);
  }

  // Buscar coincidencia local
  const local = CR_KEY_PLACES.find(p => p.name.toLowerCase().includes(clean.toLowerCase()) || clean.toLowerCase().includes(p.name.toLowerCase()));
  if (local) {
    geocodeCache.set(clean, { lat: local.lat, lon: local.lon });
    return { lat: local.lat, lon: local.lon };
  }

  // Búsqueda en línea
  try {
    const results = await searchPlaces(clean);
    if (results && results.length > 0) {
      const coord = { lat: results[0].lat, lon: results[0].lon };
      geocodeCache.set(clean, coord);
      return coord;
    }
  } catch (e) {}

  return null;
}

// Opciones de configuración de API de Google Maps Routes
export const GOOGLE_ROUTES_CONFIG = {
  // Permite leer una API Key desde localStorage si el usuario o entorno la define
  getApiKey: () => {
    try {
      return localStorage.getItem('google_maps_routes_api_key') || (typeof window !== 'undefined' && window.GOOGLE_MAPS_API_KEY) || '';
    } catch (e) {
      return '';
    }
  },
  setApiKey: (key) => {
    try {
      if (key) localStorage.setItem('google_maps_routes_api_key', key.trim());
      else localStorage.removeItem('google_maps_routes_api_key');
    } catch (e) {}
  }
};

/**
 * Consulta la API oficial de Google Maps Platform: Routes API / Compute Routes
 * Endpoint: POST https://routes.googleapis.com/directions/v2:computeRoutes
 * Modo de viaje: DRIVE
 * Devuelve la distancia exacta por carretera (distanceMeters convertido a km).
 * @param {{lat: number, lon: number}} origin
 * @param {{lat: number, lon: number}} destination
 * @returns {Promise<number|null>}
 */
export async function computeGoogleRoutesDistance(origin, destination) {
  const apiKey = GOOGLE_ROUTES_CONFIG.getApiKey();
  if (!apiKey) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const requestBody = {
      origin: {
        location: {
          latLng: {
            latitude: origin.lat,
            longitude: origin.lon
          }
        }
      },
      destination: {
        location: {
          latLng: {
            latitude: destination.lat,
            longitude: destination.lon
          }
        }
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_UNAWARE', // Cálculo consistente por red de carreteras para justificación
      computeAlternativeRoutes: false,
      units: 'METRIC'
    };

    const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration'
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.routes && data.routes.length > 0 && typeof data.routes[0].distanceMeters === 'number') {
        const meters = data.routes[0].distanceMeters;
        const km = meters / 1000;
        return Math.round(km * 10) / 10;
      }
    }
  } catch (err) {
    // Si la llamada a Google falla o da timeout, continuamos con el motor de carretera
  }

  return null;
}

/**
 * Motor de rutas por carretera (Driving Route Engine)
 * Calcula la distancia real por calles y carreteras entre dos puntos.
 * 1. Intenta primero Google Routes API (Compute Routes) si la clave está disponible.
 * 2. Si no, consulta el motor de rutas por carretera OSRM (Driving).
 * 3. Si ambos fallan (sin conexión), aplica factor vial de contingencia sobre carretera.
 * 
 * @param {{lat: number, lon: number, name?: string}|string} originPlace
 * @param {{lat: number, lon: number, name?: string}|string} destPlace
 * @returns {Promise<number|null>} Distancia en kilómetros con 1 decimal
 */
export async function calculateRouteDistance(originPlace, destPlace) {
  const coordOrigin = originPlace && originPlace.lat && originPlace.lon ? originPlace : await resolveCoordinates(originPlace.name || originPlace);
  const coordDest = destPlace && destPlace.lat && destPlace.lon ? destPlace : await resolveCoordinates(destPlace.name || destPlace);

  if (!coordOrigin || !coordDest) {
    return null;
  }

  // 1. Intentar Google Maps Routes API (Compute Routes DRIVE)
  const googleKm = await computeGoogleRoutesDistance(coordOrigin, coordDest);
  if (googleKm !== null && googleKm > 0) {
    return googleKm;
  }

  // 2. Motor de rutas vehiculares por carretera (OSRM Car / Driving)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordOrigin.lon},${coordOrigin.lat};${coordDest.lon},${coordDest.lat}?overview=false&alternatives=false&steps=false`;
    
    const resp = await fetch(osrmUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (resp.ok) {
      const json = await resp.json();
      if (json.routes && json.routes.length > 0 && typeof json.routes[0].distance === 'number') {
        const km = json.routes[0].distance / 1000;
        return Math.round(km * 10) / 10;
      }
    }
  } catch (e) {
    // Falla de red o timeout
  }

  // 3. Fallback de contingencia con factor de red vial real
  return calculateHaversineDistance(coordOrigin.lat, coordOrigin.lon, coordDest.lat, coordDest.lon);
}

/**
 * Obtiene la dirección o lugar legible a partir de lat/lon (geocodificación inversa)
 */
export async function reverseGeocode(lat, lon) {
  // Primero buscar el lugar local más cercano en CR
  let nearest = null;
  let minDistance = Infinity;

  for (const place of CR_KEY_PLACES) {
    const d = calculateHaversineDistance(lat, lon, place.lat, place.lon);
    if (d < minDistance) {
      minDistance = d;
      nearest = place;
    }
  }

  // Si está a menos de 3 km de un punto conocido, usar ese nombre
  if (nearest && minDistance <= 3.0) {
    return nearest.name;
  }

  // Si hay red, consultar Nominatim
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2800);
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`;
    const resp = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (resp.ok) {
      const data = await resp.json();
      if (data && data.display_name) {
        const parts = data.display_name.split(',');
        return parts.slice(0, 3).join(',').trim();
      }
    }
  } catch (e) {}

  return nearest ? nearest.name : `Ubicación (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
}
