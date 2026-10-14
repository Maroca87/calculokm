/**
 * places.js - Catálogo offline de alta precisión de Costa Rica + Geocodificación y cálculo de distancia
 */

/**
 * Normaliza cadenas removiendo acentos/diacríticos y espacios extra para búsqueda flexible
 */
export function normalizeText(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Catálogo amplio y verificado de lugares, instituciones, hospitales, centros comerciales y cantones de Costa Rica
export const CR_KEY_PLACES = [
  // ==========================================
  // INSTITUCIONES PÚBLICAS Y DE GOBIERNO
  // ==========================================
  { name: 'Contraloría General de la República (CGR), Sabana Sur', lat: 9.9272, lon: -84.0997 },
  { name: 'Casa Presidencial, Zapote', lat: 9.9205, lon: -84.0535 },
  { name: 'Asamblea Legislativa, San José', lat: 9.9329, lon: -84.0705 },
  { name: 'Poder Judicial / Corte Suprema de Justicia, San José', lat: 9.9304, lon: -84.0739 },
  { name: 'CCSS Oficinas Centrales, San José', lat: 9.9348, lon: -84.0784 },
  { name: 'INS Sede Central, San José', lat: 9.9366, lon: -84.0759 },
  { name: 'ICE Sede Central, Sabana Norte', lat: 9.9388, lon: -84.1037 },
  { name: 'MOPT Sede Central, Plaza Víquez', lat: 9.9248, lon: -84.0772 },
  { name: 'Ministerio de Hacienda, San José Centro', lat: 9.9321, lon: -84.0768 },
  { name: 'Registro Nacional, Zapote', lat: 9.9168, lon: -84.0514 },
  { name: 'Banco Central de Costa Rica (BCCR), San José', lat: 9.9346, lon: -84.0818 },
  { name: 'Banco Nacional de Costa Rica (BNCR) Central, San José', lat: 9.9351, lon: -84.0803 },
  { name: 'Banco de Costa Rica (BCR) Central, San José', lat: 9.9342, lon: -84.0792 },
  { name: 'Tribunal Supremo de Elecciones (TSE), San José', lat: 9.9342, lon: -84.0716 },
  { name: 'Recope Edificio Hernán Garrón, Goicoechea', lat: 9.9485, lon: -84.0531 },
  { name: 'INA Sede Central La Uruca', lat: 9.9542, lon: -84.1128 },

  // ==========================================
  // HOSPITALES Y CENTROS DE SALUD
  // ==========================================
  { name: 'Hospital México, La Uruca', lat: 9.9497, lon: -84.1077 },
  { name: 'Hospital San Juan de Dios, San José Centro', lat: 9.9344, lon: -84.0874 },
  { name: 'Hospital Rafael Ángel Calderón Guardia, San José', lat: 9.9358, lon: -84.0682 },
  { name: 'Hospital Nacional de Niños, San José', lat: 9.9349, lon: -84.0861 },
  { name: 'Hospital Clínica Bíblica, San José Centro', lat: 9.9301, lon: -84.0831 },
  { name: 'Hospital Clínica Bíblica, Santa Ana', lat: 9.9439, lon: -84.1878 },
  { name: 'Hospital CIMA, Escazú', lat: 9.9385, lon: -84.1444 },
  { name: 'Hospital Metropolitano, San José', lat: 9.9317, lon: -84.0839 },
  { name: 'Hospital Metropolitano Lindora, Santa Ana', lat: 9.9486, lon: -84.1931 },
  { name: 'Hospital San Vicente de Paúl, Heredia', lat: 9.9961, lon: -84.1264 },
  { name: 'Hospital San Rafael de Alajuela', lat: 10.0078, lon: -84.2189 },
  { name: 'Hospital Max Peralta, Cartago', lat: 9.8624, lon: -83.9168 },
  { name: 'Hospital Monseñor Sanabria, Puntarenas', lat: 9.9839, lon: -84.7778 },
  { name: 'Hospital Enrique Baltodano Briceño, Liberia', lat: 10.6389, lon: -85.4394 },
  { name: 'Hospital Tony Facio Castro, Limón', lat: 9.9972, lon: -83.0289 },
  { name: 'Hospital de Guápiles, Pococí', lat: 10.2189, lon: -83.7917 },
  { name: 'Hospital San Carlos, Ciudad Quesada', lat: 10.3242, lon: -84.4317 },
  { name: 'Hospital Escalante Pradilla, Pérez Zeledón', lat: 9.3756, lon: -83.7042 },
  { name: 'Hospital La Anexión, Nicoya', lat: 10.1417, lon: -85.4528 },
  { name: 'Clínica Marcial Fallas, Desamparados', lat: 9.8972, lon: -84.0647 },
  { name: 'Clínica Carlos Durán, San José', lat: 9.9239, lon: -84.0678 },
  { name: 'Clínica Clorito Picado, Tibás', lat: 9.9542, lon: -84.0847 },
  { name: 'Clínica Dr. Solón Núñez, Hatillo', lat: 9.9156, lon: -84.1017 },
  { name: 'Clínica Dr. Ricardo Jiménez Núñez, Goicoechea', lat: 9.9442, lon: -84.0539 },

  // ==========================================
  // CENTROS COMERCIALES Y PLAZAS
  // ==========================================
  { name: 'Multiplaza Escazú', lat: 9.9431, lon: -84.1492 },
  { name: 'Multiplaza Curridabat (del Este)', lat: 9.9208, lon: -84.0389 },
  { name: 'City Mall Alajuela', lat: 10.0069, lon: -84.2125 },
  { name: 'Paseo de las Flores, Heredia', lat: 9.9917, lon: -84.1114 },
  { name: 'Oxígeno Human Playground, San Francisco de Heredia', lat: 9.9889, lon: -84.1267 },
  { name: 'Lincoln Plaza, Moravia', lat: 9.9639, lon: -84.0536 },
  { name: 'Mall San Pedro, Montes de Oca', lat: 9.9333, lon: -84.0578 },
  { name: 'Paseo Metrópoli, Cartago', lat: 9.8661, lon: -83.9389 },
  { name: 'Terramall, Tres Ríos', lat: 9.9078, lon: -83.9989 },
  { name: 'Avenida Escazú', lat: 9.9392, lon: -84.1439 },
  { name: 'Escazú Village', lat: 9.9378, lon: -84.1389 },
  { name: 'Terrazas Lindora, Santa Ana', lat: 9.9458, lon: -84.1892 },
  { name: 'Plaza Real Alajuela', lat: 10.0153, lon: -84.2178 },
  { name: 'Plaza Real Cariari, Heredia', lat: 9.9767, lon: -84.1611 },
  { name: 'Decathlon Curridabat', lat: 9.9189, lon: -84.0322 },
  { name: 'PriceSmart Zapote', lat: 9.9189, lon: -84.0556 },
  { name: 'PriceSmart Escazú', lat: 9.9367, lon: -84.1439 },
  { name: 'PriceSmart Heredia', lat: 9.9883, lon: -84.1289 },
  { name: 'PriceSmart Llorente de Tibás', lat: 9.9611, lon: -84.0756 },
  { name: 'PriceSmart Alajuela', lat: 10.0094, lon: -84.2189 },
  { name: 'PriceSmart Santa Ana', lat: 9.9442, lon: -84.1878 },
  { name: 'PriceSmart Cartago (Tres Ríos)', lat: 9.8667, lon: -83.9367 },
  { name: 'Walmart Escazú', lat: 9.9356, lon: -84.1417 },
  { name: 'Walmart San Sebastián', lat: 9.9094, lon: -84.0889 },
  { name: 'Walmart Heredia', lat: 9.9939, lon: -84.1167 },
  { name: 'Walmart Alajuela', lat: 10.0125, lon: -84.2167 },
  { name: 'Walmart Curridabat', lat: 9.9197, lon: -84.0347 },
  { name: 'Walmart Tibás', lat: 9.9614, lon: -84.0806 },
  { name: 'Walmart Cartago', lat: 9.8653, lon: -83.9347 },
  { name: 'Walmart Guadalupe', lat: 9.9456, lon: -84.0514 },

  // ==========================================
  // PARQUES EMPRESARIALES Y ZONAS FRANCAS
  // ==========================================
  { name: 'Zona Franca El Coyol, Alajuela', lat: 9.9986, lon: -84.2586 },
  { name: 'América Free Zone (AFZ), San Antonio de Belén', lat: 9.9792, lon: -84.1694 },
  { name: 'Global Park, Heredia', lat: 9.9778, lon: -84.1528 },
  { name: 'UltraPark 1, La Aurora de Heredia', lat: 9.9792, lon: -84.1556 },
  { name: 'UltraPark 2, Barreal de Heredia', lat: 9.9753, lon: -84.1489 },
  { name: 'Parque Empresarial Forum 1, Santa Ana', lat: 9.9417, lon: -84.1833 },
  { name: 'Parque Empresarial Forum 2, Lindora', lat: 9.9472, lon: -84.1944 },
  { name: 'Centro Corporativo El Cafetal, Belén', lat: 9.9806, lon: -84.1833 },
  { name: 'Plaza Roble, Escazú', lat: 9.9422, lon: -84.1506 },
  { name: 'Terra Campus Corporativo, Tres Ríos', lat: 9.9083, lon: -83.9972 },
  { name: 'Zona Franca Metro, Barreal de Heredia', lat: 9.9772, lon: -84.1458 },
  { name: 'Parque Industrial Zeta, Cartago', lat: 9.8514, lon: -83.9417 },
  { name: 'Parque Empresarial del Este, Curridabat', lat: 9.9167, lon: -84.0278 },

  // ==========================================
  // UNIVERSIDADES Y CENTROS EDUCATIVOS
  // ==========================================
  { name: 'Universidad de Costa Rica (UCR) Rodrigo Facio, San Pedro', lat: 9.9378, lon: -84.0522 },
  { name: 'Tecnológico de Costa Rica (TEC), Sede Central Cartago', lat: 9.8553, lon: -83.9103 },
  { name: 'TEC Sede San José, Barrio Amón', lat: 9.9389, lon: -84.0756 },
  { name: 'Universidad Nacional (UNA), Campus Omar Dengo, Heredia', lat: 9.9997, lon: -84.1114 },
  { name: 'Universidad Estatal a Distancia (UNED), Sabanilla', lat: 9.9417, lon: -84.0417 },
  { name: 'Universidad Técnica Nacional (UTN), Alajuela', lat: 10.0153, lon: -84.2042 },
  { name: 'UCIMED, Sabana Oeste', lat: 9.9372, lon: -84.1139 },
  { name: 'ULACIT, Barrio Tournón, San José', lat: 9.9442, lon: -84.0789 },
  { name: 'Universidad Latina de Costa Rica, San Pedro', lat: 9.9317, lon: -84.0489 },
  { name: 'Universidad Latina de Costa Rica, Heredia', lat: 9.9939, lon: -84.1222 },
  { name: 'Universidad Fidélitas, San Pedro', lat: 9.9306, lon: -84.0431 },
  { name: 'Universidad Fidélitas, Heredia', lat: 9.9861, lon: -84.1333 },

  // ==========================================
  // HITOS Y TRANSPORTE
  // ==========================================
  { name: 'Aeropuerto Internacional Juan Santamaría (SJO), Alajuela', lat: 9.9981, lon: -84.2041 },
  { name: 'Aeropuerto Internacional Daniel Oduber Quirós (LIR), Liberia', lat: 10.5933, lon: -85.5444 },
  { name: 'Aeropuerto Tobías Bolaños, Pavas', lat: 9.9567, lon: -84.1394 },
  { name: 'Parque Metropolitano La Sabana, San José', lat: 9.9358, lon: -84.1039 },
  { name: 'Estadio Nacional de Costa Rica, La Sabana', lat: 9.9367, lon: -84.1078 },
  { name: 'Parque Central de San José', lat: 9.9331, lon: -84.0792 },
  { name: 'Plaza de la Cultura, San José', lat: 9.9333, lon: -84.0772 },
  { name: 'Terminal 7-10, San José', lat: 9.9392, lon: -84.0839 },
  { name: 'Basílica de Nuestra Señora de Los Ángeles, Cartago', lat: 9.8639, lon: -83.9128 },
  { name: 'Parque de la Paz, San José', lat: 9.9125, lon: -84.0764 },

  // ==========================================
  // SAN JOSÉ: CANTONES Y DISTRITOS
  // ==========================================
  { name: 'San José Centro, San José', lat: 9.9333, lon: -84.0833 },
  { name: 'Tecnova Soluciones, Los Yoses, San Pedro', lat: 9.9314, lon: -84.0612 },
  { name: 'Los Yoses, San Pedro', lat: 9.9314, lon: -84.0612 },
  { name: 'Barrio Escalante, San José', lat: 9.9358, lon: -84.0639 },
  { name: 'Barrio Amón, San José', lat: 9.9389, lon: -84.0767 },
  { name: 'Zapote, San José', lat: 9.9198, lon: -84.0531 },
  { name: 'San Pedro, Montes de Oca', lat: 9.9328, lon: -84.0519 },
  { name: 'Sabanilla, Montes de Oca', lat: 9.9439, lon: -84.0436 },
  { name: 'Curridabat Centro, San José', lat: 9.9157, lon: -84.0354 },
  { name: 'Granadilla, Curridabat', lat: 9.9336, lon: -84.0258 },
  { name: 'Desamparados Centro, San José', lat: 9.8988, lon: -84.0689 },
  { name: 'San Antonio de Desamparados', lat: 9.8942, lon: -84.0519 },
  { name: 'San Rafael Abajo, Desamparados', lat: 9.8944, lon: -84.0833 },
  { name: 'Escazú Centro (San Miguel), San José', lat: 9.9189, lon: -84.1388 },
  { name: 'San Rafael de Escazú', lat: 9.9367, lon: -84.1389 },
  { name: 'San Antonio de Escazú', lat: 9.9056, lon: -84.1417 },
  { name: 'Guachipelín, Escazú', lat: 9.9467, lon: -84.1542 },
  { name: 'Santa Ana Centro, San José', lat: 9.9326, lon: -84.1826 },
  { name: 'Pozos, Santa Ana', lat: 9.9472, lon: -84.1833 },
  { name: 'Lindora, Santa Ana', lat: 9.9514, lon: -84.1889 },
  { name: 'Ciudad Colón, Mora', lat: 9.9153, lon: -84.2417 },
  { name: 'Tibás (San Juan), San José', lat: 9.9575, lon: -84.0825 },
  { name: 'Llorente, Tibás', lat: 9.9611, lon: -84.0756 },
  { name: 'Moravia (San Vicente), San José', lat: 9.9619, lon: -84.0494 },
  { name: 'La Trinidad, Moravia', lat: 9.9722, lon: -84.0289 },
  { name: 'Guadalupe Centro, Goicoechea', lat: 9.9472, lon: -84.0569 },
  { name: 'Calle Blancos, Goicoechea', lat: 9.9514, lon: -84.0667 },
  { name: 'Ipís, Goicoechea', lat: 9.9639, lon: -84.0194 },
  { name: 'Coronado (San Isidro), San José', lat: 9.9761, lon: -84.0069 },
  { name: 'Pavas, San José', lat: 9.9489, lon: -84.1319 },
  { name: 'Rohrmoser, Pavas', lat: 9.9458, lon: -84.1189 },
  { name: 'La Uruca, San José', lat: 9.9536, lon: -84.1039 },
  { name: 'Hatillo, San José', lat: 9.9161, lon: -84.0978 },
  { name: 'San Sebastián, San José', lat: 9.9125, lon: -84.0853 },
  { name: 'Paso Ancho, San José', lat: 9.9142, lon: -84.0794 },
  { name: 'Alajuelita Centro, San José', lat: 9.9014, lon: -84.1006 },
  { name: 'Aserrí Centro, San José', lat: 9.8667, lon: -84.0917 },
  { name: 'Puriscal (Santiago), San José', lat: 9.8489, lon: -84.3128 },
  { name: 'Acosta (San Ignacio), San José', lat: 9.7983, lon: -84.1611 },
  { name: 'Santa María de Dota, San José', lat: 9.6542, lon: -83.9722 },
  { name: 'San Marcos de Tarrazú, San José', lat: 9.6611, lon: -84.0222 },
  { name: 'San Pablo de León Cortés, San José', lat: 9.6861, lon: -84.0444 },
  { name: 'Pérez Zeledón (San Isidro de El General)', lat: 9.3736, lon: -83.7036 },

  // ==========================================
  // ALAJUELA: CANTONES Y DISTRITOS
  // ==========================================
  { name: 'Alajuela Centro, Alajuela', lat: 10.0163, lon: -84.2116 },
  { name: 'El Coyol, Alajuela', lat: 9.9986, lon: -84.2586 },
  { name: 'La Guácima, Alajuela', lat: 9.9753, lon: -84.2417 },
  { name: 'San Rafael de Alajuela', lat: 9.9764, lon: -84.2083 },
  { name: 'Río Segundo, Alajuela', lat: 10.0056, lon: -84.1889 },
  { name: 'San Ramón Centro, Alajuela', lat: 10.0872, lon: -84.4703 },
  { name: 'Grecia Centro, Alajuela', lat: 10.0739, lon: -84.3122 },
  { name: 'Palmares Centro, Alajuela', lat: 10.0594, lon: -84.4336 },
  { name: 'Naranjo Centro, Alajuela', lat: 10.0983, lon: -84.3878 },
  { name: 'Atenas Centro, Alajuela', lat: 9.9786, lon: -84.3800 },
  { name: 'San Pedro de Poás, Alajuela', lat: 10.0764, lon: -84.2417 },
  { name: 'Sarchí Centro (Valverde Vega), Alajuela', lat: 10.0889, lon: -84.3417 },
  { name: 'Orotina Centro, Alajuela', lat: 9.9111, lon: -84.5239 },
  { name: 'San Mateo Centro, Alajuela', lat: 9.9489, lon: -84.5317 },
  { name: 'Ciudad Quesada (San Carlos), Alajuela', lat: 10.3238, lon: -84.4283 },
  { name: 'La Fortuna, San Carlos', lat: 10.4709, lon: -84.6453 },
  { name: 'Aguas Zarcas, San Carlos', lat: 10.3806, lon: -84.3417 },
  { name: 'Pital, San Carlos', lat: 10.4489, lon: -84.2756 },
  { name: 'Zarcero Centro, Alajuela', lat: 10.1861, lon: -84.4139 },
  { name: 'Upala Centro, Alajuela', lat: 10.8986, lon: -85.0167 },
  { name: 'Los Chiles Centro, Alajuela', lat: 11.0333, lon: -84.7167 },
  { name: 'Guatuso (San Rafael), Alajuela', lat: 10.6722, lon: -84.8256 },
  { name: 'Río Cuarto Centro, Alajuela', lat: 10.3472, lon: -84.2167 },

  // ==========================================
  // HEREDIA: CANTONES Y DISTRITOS
  // ==========================================
  { name: 'Heredia Centro, Heredia', lat: 9.9989, lon: -84.1169 },
  { name: 'San Francisco de Heredia', lat: 9.9889, lon: -84.1278 },
  { name: 'Barreal de Heredia', lat: 9.9789, lon: -84.1481 },
  { name: 'Lagunilla, Heredia', lat: 9.9800, lon: -84.1292 },
  { name: 'La Aurora, Heredia', lat: 9.9806, lon: -84.1556 },
  { name: 'Mercedes Norte, Heredia', lat: 10.0094, lon: -84.1289 },
  { name: 'Barva Centro, Heredia', lat: 10.0211, lon: -84.1247 },
  { name: 'Santo Domingo Centro, Heredia', lat: 9.9806, lon: -84.0894 },
  { name: 'Santa Bárbara Centro, Heredia', lat: 10.0389, lon: -84.1583 },
  { name: 'San Rafael Centro, Heredia', lat: 10.0139, lon: -84.1017 },
  { name: 'San Isidro Centro, Heredia', lat: 10.0189, lon: -84.0556 },
  { name: 'Belén (San Antonio), Heredia', lat: 9.9814, lon: -84.1844 },
  { name: 'La Ribera de Belén', lat: 9.9889, lon: -84.1756 },
  { name: 'La Asunción de Belén', lat: 9.9753, lon: -84.1722 },
  { name: 'San Joaquín de Flores, Heredia', lat: 10.0069, lon: -84.1561 },
  { name: 'San Pablo Centro, Heredia', lat: 9.9961, lon: -84.0983 },
  { name: 'Rincón de Sabanilla, San Pablo', lat: 9.9889, lon: -84.0944 },
  { name: 'Sarapiquí (Puerto Viejo), Heredia', lat: 10.4578, lon: -84.0089 },
  { name: 'La Virgen de Sarapiquí', lat: 10.3889, lon: -84.1333 },

  // ==========================================
  // CARTAGO: CANTONES Y DISTRITOS
  // ==========================================
  { name: 'Cartago Centro, Cartago', lat: 9.8644, lon: -83.9194 },
  { name: 'Tres Ríos, La Unión', lat: 9.9078, lon: -83.9875 },
  { name: 'San Diego, La Unión', lat: 9.9042, lon: -84.0042 },
  { name: 'San Rafael, La Unión', lat: 9.9194, lon: -83.9917 },
  { name: 'Paraíso Centro, Cartago', lat: 9.8383, lon: -83.8656 },
  { name: 'Orosi, Paraíso', lat: 9.7972, lon: -83.8556 },
  { name: 'Cachí, Paraíso', lat: 9.8278, lon: -83.8056 },
  { name: 'Turrialba Centro, Cartago', lat: 9.9047, lon: -83.6833 },
  { name: 'La Suiza, Turrialba', lat: 9.8489, lon: -83.6194 },
  { name: 'San Rafael de Oreamuno, Cartago', lat: 9.8703, lon: -83.9056 },
  { name: 'Cot, Oreamuno', lat: 9.8944, lon: -83.8861 },
  { name: 'El Guarco (El Tejar), Cartago', lat: 9.8458, lon: -83.9286 },
  { name: 'Pacayas, Alvarado', lat: 9.9189, lon: -83.8067 },
  { name: 'Juan Viñas, Jiménez', lat: 9.8972, lon: -83.7444 },

  // ==========================================
  // PUNTARENAS: CANTONES Y LOCALIDADES
  // ==========================================
  { name: 'Puntarenas Centro (El Carmen)', lat: 9.9763, lon: -84.8384 },
  { name: 'Barranca, Puntarenas', lat: 9.9789, lon: -84.7333 },
  { name: 'El Roble, Puntarenas', lat: 9.9814, lon: -84.7556 },
  { name: 'Chacarita, Puntarenas', lat: 9.9861, lon: -84.7778 },
  { name: 'Esparza Centro, Puntarenas', lat: 9.9947, lon: -84.6653 },
  { name: 'Jacó, Garabito', lat: 9.6150, lon: -84.6297 },
  { name: 'Herradura, Garabito', lat: 9.6456, lon: -84.6367 },
  { name: 'Quepos / Manuel Antonio', lat: 9.4319, lon: -84.1619 },
  { name: 'Parrita Centro, Puntarenas', lat: 9.5211, lon: -84.3278 },
  { name: 'Golfito Centro, Puntarenas', lat: 8.6361, lon: -83.1664 },
  { name: 'Puerto Jiménez, Puntarenas', lat: 8.5361, lon: -83.3056 },
  { name: 'Ciudad Neily (Corredores), Puntarenas', lat: 8.6472, lon: -82.9464 },
  { name: 'Paso Canoas (Frontera Sur)', lat: 8.5322, lon: -82.8406 },
  { name: 'San Vito, Coto Brus', lat: 8.8256, lon: -82.9739 },
  { name: 'Palmar Norte, Osa', lat: 8.9594, lon: -83.4542 },
  { name: 'Uvita / Bahía Ballena, Osa', lat: 9.1678, lon: -83.7389 },
  { name: 'Buenos Aires Centro, Puntarenas', lat: 9.1711, lon: -83.3342 },
  { name: 'Monteverde Centro, Puntarenas', lat: 10.3167, lon: -84.8250 },
  { name: 'Santa Elena, Monteverde', lat: 10.3208, lon: -84.8256 },
  { name: 'Cóbano, Puntarenas', lat: 9.6806, lon: -85.0944 },
  { name: 'Santa Teresa, Cóbano', lat: 9.6472, lon: -85.1667 },
  { name: 'Montezuma, Cóbano', lat: 9.6542, lon: -85.0667 },
  { name: 'Paquera, Puntarenas', lat: 9.8211, lon: -84.9367 },

  // ==========================================
  // GUANACASTE: CANTONES Y PLAYAS
  // ==========================================
  { name: 'Liberia Centro, Guanacaste', lat: 10.6347, lon: -85.4406 },
  { name: 'Nicoya Centro, Guanacaste', lat: 10.1444, lon: -85.4542 },
  { name: 'Santa Cruz Centro, Guanacaste', lat: 10.2608, lon: -85.5853 },
  { name: 'Tamarindo, Guanacaste', lat: 10.2994, lon: -85.8397 },
  { name: 'Flamingo / Brasilito, Santa Cruz', lat: 10.4367, lon: -85.7889 },
  { name: 'Playas del Coco, Carrillo', lat: 10.5517, lon: -85.6983 },
  { name: 'Filadelfia, Carrillo', lat: 10.4439, lon: -85.5492 },
  { name: 'Cañas Centro, Guanacaste', lat: 10.4311, lon: -85.0978 },
  { name: 'Bagaces Centro, Guanacaste', lat: 10.5283, lon: -85.2556 },
  { name: 'Tilarán Centro, Guanacaste', lat: 10.4706, lon: -84.9689 },
  { name: 'Las Juntas, Abangares', lat: 10.2789, lon: -84.9583 },
  { name: 'La Cruz Centro, Guanacaste', lat: 11.0722, lon: -85.6317 },
  { name: 'Peñas Blancas (Frontera Norte)', lat: 11.2189, lon: -85.6111 },
  { name: 'Nandayure (Carmona), Guanacaste', lat: 9.9889, lon: -85.2539 },
  { name: 'Hojancha Centro, Guanacaste', lat: 10.0594, lon: -85.4217 },
  { name: 'Sámara, Nicoya', lat: 9.8806, lon: -85.5278 },
  { name: 'Nosara / Guiones, Nicoya', lat: 9.9778, lon: -85.6667 },

  // ==========================================
  // LIMÓN: CANTONES Y LOCALIDADES
  // ==========================================
  { name: 'Limón Centro (Puerto Limón)', lat: 9.9907, lon: -83.0360 },
  { name: 'Pococí (Guápiles Centro), Limón', lat: 10.2153, lon: -83.7844 },
  { name: 'La Rita, Pococí', lat: 10.2764, lon: -83.7789 },
  { name: 'Cariari, Pococí', lat: 10.4361, lon: -83.7361 },
  { name: 'Siquirres Centro, Limón', lat: 10.0983, lon: -83.5078 },
  { name: 'Bribri, Talamanca', lat: 9.6239, lon: -82.8406 },
  { name: 'Puerto Viejo, Talamanca', lat: 9.6569, lon: -82.7544 },
  { name: 'Cahuita, Talamanca', lat: 9.7389, lon: -82.8456 },
  { name: 'Manzanillo, Talamanca', lat: 9.6317, lon: -82.6556 },
  { name: 'Matina Centro, Limón', lat: 10.0833, lon: -83.2833 },
  { name: 'Batán, Matina', lat: 10.0839, lon: -83.3333 },
  { name: 'Guácimo Centro, Limón', lat: 10.2111, lon: -83.6861 }
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
 * Busca coincidencias en el catálogo local con tolerancia a acentos y múltiples palabras
 * @param {string} query
 * @returns {Array<{name: string, lat: number, lon: number}>}
 */
export function searchLocalPlaces(query) {
  const normQ = normalizeText(query);
  if (normQ.length < 2) return [];

  const tokens = normQ.split(/\s+/).filter(Boolean);
  const scored = [];

  for (const place of CR_KEY_PLACES) {
    const normName = normalizeText(place.name);
    // Verificar si todos los términos buscados aparecen en el nombre del lugar
    const allTokensMatch = tokens.every(token => normName.includes(token));
    if (allTokensMatch) {
      let score = 0;
      if (normName === normQ) score += 100;
      else if (normName.startsWith(normQ)) score += 60;
      else if (normName.split(',')[0].trim() === normQ) score += 80;
      else score += 30;

      scored.push({ place, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.place);
}

/**
 * Consulta la API de Photon (OpenStreetMap) optimizada para POIs específicos con sesgo geográfico en Costa Rica
 */
async function searchPhotonCR(query) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const cleanQuery = query.trim();
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&lat=9.9333&lon=-84.0833&limit=6`;
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.features)) {
        return data.features
          // Filtrar resultados que estén razonablemente en el cuadrante de Costa Rica
          .filter(f => {
            const [lon, lat] = f.geometry.coordinates;
            return lat >= 8.0 && lat <= 11.4 && lon >= -86.1 && lon <= -82.4;
          })
          .map(f => {
            const p = f.properties || {};
            const parts = [p.name];
            if (p.street) parts.push(p.street);
            if (p.city || p.town || p.district) parts.push(p.city || p.town || p.district);
            else if (p.state) parts.push(p.state);

            return {
              name: parts.filter(Boolean).join(', ').trim(),
              lat: f.geometry.coordinates[1],
              lon: f.geometry.coordinates[0]
            };
          });
      }
    }
  } catch (e) {}
  return [];
}

/**
 * Consulta la API de Nominatim de OpenStreetMap con filtros estrictos de Costa Rica
 */
async function searchNominatimCR(query) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3200);
    const cleanQuery = query.toLowerCase().includes('costa rica') ? query.trim() : `${query.trim()}, Costa Rica`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&countrycodes=cr&limit=6&addressdetails=1`;
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'es'
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data.map(item => ({
          name: item.display_name.split(',').slice(0, 3).join(', ').trim(),
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon)
        }));
      }
    }
  } catch (e) {}
  return [];
}

/**
 * Busca coincidencias locales o en línea con máxima precisión
 * @param {string} query 
 * @returns {Promise<Array<{name: string, lat: number, lon: number}>>}
 */
export async function searchPlaces(query) {
  const q = (query || '').trim();
  if (q.length < 2) return [];

  const cacheKey = 'search_' + normalizeText(q);
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey);
  }

  // 1. Coincidencias locales inmediatas con normalización
  const localMatches = searchLocalPlaces(q);

  // Si tenemos una coincidencia local exacta o muy relevante
  const hasExactLocal = localMatches.length > 0 && normalizeText(localMatches[0].name).startsWith(normalizeText(q));

  // 2. Si no es exacta o hay pocos resultados, consultar motores en línea en paralelo
  let onlineMatches = [];
  try {
    const [photonRes, nomRes] = await Promise.allSettled([
      searchPhotonCR(q),
      searchNominatimCR(q)
    ]);

    const photonList = photonRes.status === 'fulfilled' ? photonRes.value : [];
    const nomList = nomRes.status === 'fulfilled' ? nomRes.value : [];

    onlineMatches = [...photonList, ...nomList];
  } catch (e) {}

  // 3. Combinar resultados locales y online evitando duplicados por proximidad (< 250m)
  const combined = hasExactLocal ? [...localMatches] : [];
  
  for (const item of [...onlineMatches, ...localMatches]) {
    const alreadyExists = combined.some(c => 
      calculateHaversineDistance(c.lat, c.lon, item.lat, item.lon) < 0.25 ||
      normalizeText(c.name) === normalizeText(item.name)
    );
    if (!alreadyExists) {
      combined.push(item);
    }
  }

  const results = combined.slice(0, 7);
  if (results.length > 0) {
    geocodeCache.set(cacheKey, results);
  }
  return results.length > 0 ? results : localMatches.slice(0, 5);
}

/**
 * Intenta resolver las coordenadas de un nombre de lugar o dirección exacta.
 */
export async function resolveCoordinates(placeName) {
  const clean = (placeName || '').trim();
  if (!clean || clean.length < 2) return null;

  const cacheKey = 'coord_' + normalizeText(clean);
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey);
  }

  const normQuery = normalizeText(clean);

  // 1. Buscar coincidencia en catálogo local
  const localList = searchLocalPlaces(clean);
  if (localList.length > 0) {
    const first = localList[0];
    const normFirst = normalizeText(first.name);
    if (normFirst === normQuery || normFirst.startsWith(normQuery) || normQuery.startsWith(normFirst.split(',')[0])) {
      const coord = { lat: first.lat, lon: first.lon };
      geocodeCache.set(cacheKey, coord);
      return coord;
    }
  }

  // 2. Geocodificación precisa en línea
  try {
    const results = await searchPlaces(clean);
    if (results && results.length > 0) {
      const coord = { lat: results[0].lat, lon: results[0].lon };
      geocodeCache.set(cacheKey, coord);
      return coord;
    }
  } catch (e) {}

  // 3. Fallback al primer resultado local si existe
  if (localList.length > 0) {
    const coord = { lat: localList[0].lat, lon: localList[0].lon };
    geocodeCache.set(cacheKey, coord);
    return coord;
  }

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
