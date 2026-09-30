/**
 * rates.js - Matriz oficial de tarifas de kilometraje de la Contraloría General de la República (CGR)
 * Fuente: https://www.cgr.go.cr/02-consultas/consulta_zon-kilo-via.html
 * Moneda: Colones costarricenses (₡) por kilómetro recorrido.
 */

export const BASE_YEAR = 2025;

export const CATEGORIES = {
  RURAL_GASOLINA: 'RURAL_GASOLINA',
  RURAL_DIESEL: 'RURAL_DIESEL',
  LIVIANO_GASOLINA_A: 'LIVIANO_GASOLINA_A', // <= 1600cc
  LIVIANO_GASOLINA_B: 'LIVIANO_GASOLINA_B', // > 1600cc
  LIVIANO_DIESEL: 'LIVIANO_DIESEL',
  MOTO_GASOLINA: 'MOTO_GASOLINA',
  MOTO_ELECTRICA: 'MOTO_ELECTRICA',
  HIBRIDO: 'HIBRIDO',
  ELECTRICO: 'ELECTRICO'
};

export const CATEGORY_LABELS = {
  [CATEGORIES.RURAL_GASOLINA]: 'Vehículo Rural Gasolina',
  [CATEGORIES.RURAL_DIESEL]: 'Vehículo Rural Diesel',
  [CATEGORIES.LIVIANO_GASOLINA_A]: 'Vehículo Liviano Gasolina A (≤ 1.600 cc)',
  [CATEGORIES.LIVIANO_GASOLINA_B]: 'Vehículo Liviano Gasolina B (> 1.600 cc)',
  [CATEGORIES.LIVIANO_DIESEL]: 'Vehículo Liviano Diesel',
  [CATEGORIES.MOTO_GASOLINA]: 'Motocicleta Gasolina',
  [CATEGORIES.MOTO_ELECTRICA]: 'Motocicleta Eléctrica',
  [CATEGORIES.HIBRIDO]: 'Vehículo Híbrido',
  [CATEGORIES.ELECTRICO]: 'Vehículo Eléctrico'
};

/**
 * Matriz oficial de tarifas por antigüedad (0 a 10 y más años)
 * Índice = años de antigüedad (0 = Modelo 2025, 1 = 2024, ..., 10 = 2015 o anterior)
 */
export const RATES_MATRIX = [
  // 0 años (Modelo 2025)
  {
    age: 0,
    modelYear: 2025,
    [CATEGORIES.RURAL_GASOLINA]: 293.90,
    [CATEGORIES.RURAL_DIESEL]: 266.91,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 199.65,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 254.10,
    [CATEGORIES.LIVIANO_DIESEL]: 231.28,
    [CATEGORIES.MOTO_GASOLINA]: 71.56,
    [CATEGORIES.MOTO_ELECTRICA]: 60.24,
    [CATEGORIES.HIBRIDO]: 249.30,
    [CATEGORIES.ELECTRICO]: 190.97
  },
  // 1 año (Modelo 2024)
  {
    age: 1,
    modelYear: 2024,
    [CATEGORIES.RURAL_GASOLINA]: 273.00,
    [CATEGORIES.RURAL_DIESEL]: 246.46,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 187.53,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 236.41,
    [CATEGORIES.LIVIANO_DIESEL]: 215.98,
    [CATEGORIES.MOTO_GASOLINA]: 69.75,
    [CATEGORIES.MOTO_ELECTRICA]: 53.08,
    [CATEGORIES.HIBRIDO]: 231.02,
    [CATEGORIES.ELECTRICO]: 167.38
  },
  // 2 años (Modelo 2023)
  {
    age: 2,
    modelYear: 2023,
    [CATEGORIES.RURAL_GASOLINA]: 261.55,
    [CATEGORIES.RURAL_DIESEL]: 235.12,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 180.97,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 226.70,
    [CATEGORIES.LIVIANO_DIESEL]: 207.65,
    [CATEGORIES.MOTO_GASOLINA]: 69.05,
    [CATEGORIES.MOTO_ELECTRICA]: 48.84,
    [CATEGORIES.HIBRIDO]: 220.98,
    [CATEGORIES.ELECTRICO]: 153.77
  },
  // 3 años (Modelo 2022)
  {
    age: 3,
    modelYear: 2022,
    [CATEGORIES.RURAL_GASOLINA]: 255.78,
    [CATEGORIES.RURAL_DIESEL]: 229.25,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 177.76,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 221.77,
    [CATEGORIES.LIVIANO_DIESEL]: 203.50,
    [CATEGORIES.MOTO_GASOLINA]: 69.01,
    [CATEGORIES.MOTO_ELECTRICA]: 46.35,
    [CATEGORIES.HIBRIDO]: 215.90,
    [CATEGORIES.ELECTRICO]: 146.17
  },
  // 4 años (Modelo 2021)
  {
    age: 4,
    modelYear: 2021,
    [CATEGORIES.RURAL_GASOLINA]: 253.39,
    [CATEGORIES.RURAL_DIESEL]: 226.66,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 176.54,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 219.71,
    [CATEGORIES.LIVIANO_DIESEL]: 201.86,
    [CATEGORIES.MOTO_GASOLINA]: 69.01,
    [CATEGORIES.MOTO_ELECTRICA]: 46.35,
    [CATEGORIES.HIBRIDO]: 213.79,
    [CATEGORIES.ELECTRICO]: 143.19
  },
  // 5 años (Modelo 2020)
  {
    age: 5,
    modelYear: 2020,
    [CATEGORIES.RURAL_GASOLINA]: 253.05,
    [CATEGORIES.RURAL_DIESEL]: 226.02,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 176.52,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 219.37,
    [CATEGORIES.LIVIANO_DIESEL]: 201.72,
    [CATEGORIES.MOTO_GASOLINA]: 69.01,
    [CATEGORIES.MOTO_ELECTRICA]: 46.35,
    [CATEGORIES.HIBRIDO]: 213.48,
    [CATEGORIES.ELECTRICO]: 140.43
  },
  // 6 años (Modelo 2019)
  {
    age: 6,
    modelYear: 2019,
    [CATEGORIES.RURAL_GASOLINA]: 253.05,
    [CATEGORIES.RURAL_DIESEL]: 226.02,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 176.52,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 219.37,
    [CATEGORIES.LIVIANO_DIESEL]: 201.72,
    [CATEGORIES.MOTO_GASOLINA]: 69.01,
    [CATEGORIES.MOTO_ELECTRICA]: 46.35,
    [CATEGORIES.HIBRIDO]: 213.48,
    [CATEGORIES.ELECTRICO]: 140.01
  },
  // 7 años (Modelo 2018)
  {
    age: 7,
    modelYear: 2018,
    [CATEGORIES.RURAL_GASOLINA]: 250.28,
    [CATEGORIES.RURAL_DIESEL]: 222.75,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 175.25,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 216.92,
    [CATEGORIES.LIVIANO_DIESEL]: 199.89,
    [CATEGORIES.MOTO_GASOLINA]: 69.01,
    [CATEGORIES.MOTO_ELECTRICA]: 46.35,
    [CATEGORIES.HIBRIDO]: 211.10,
    [CATEGORIES.ELECTRICO]: 134.94
  },
  // 8 años (Modelo 2017)
  {
    age: 8,
    modelYear: 2017,
    [CATEGORIES.RURAL_GASOLINA]: 247.27,
    [CATEGORIES.RURAL_DIESEL]: 219.56,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 173.66,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 214.32,
    [CATEGORIES.LIVIANO_DIESEL]: 197.79,
    [CATEGORIES.MOTO_GASOLINA]: 69.01,
    [CATEGORIES.MOTO_ELECTRICA]: 46.35,
    [CATEGORIES.HIBRIDO]: 208.54,
    [CATEGORIES.ELECTRICO]: 130.63
  },
  // 9 años (Modelo 2016)
  {
    age: 9,
    modelYear: 2016,
    [CATEGORIES.RURAL_GASOLINA]: 244.84,
    [CATEGORIES.RURAL_DIESEL]: 216.92,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 172.41,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 212.21,
    [CATEGORIES.LIVIANO_DIESEL]: 196.10,
    [CATEGORIES.MOTO_GASOLINA]: 69.01,
    [CATEGORIES.MOTO_ELECTRICA]: 46.35,
    [CATEGORIES.HIBRIDO]: 206.51,
    [CATEGORIES.ELECTRICO]: 126.99
  },
  // 10 y más años (Modelo 2015 o anterior)
  {
    age: 10,
    modelYear: 2015,
    [CATEGORIES.RURAL_GASOLINA]: 242.92,
    [CATEGORIES.RURAL_DIESEL]: 214.78,
    [CATEGORIES.LIVIANO_GASOLINA_A]: 171.46,
    [CATEGORIES.LIVIANO_GASOLINA_B]: 210.52,
    [CATEGORIES.LIVIANO_DIESEL]: 194.78,
    [CATEGORIES.MOTO_GASOLINA]: 69.01,
    [CATEGORIES.MOTO_ELECTRICA]: 46.35,
    [CATEGORIES.HIBRIDO]: 204.94,
    [CATEGORIES.ELECTRICO]: 123.98
  }
];

/**
 * Determina la antigüedad en años a partir del año del vehículo.
 * La tabla oficial toma como año 0 el modelo 2025.
 * @param {number} year 
 * @returns {number} 0 a 10
 */
export function calculateAge(year) {
  const y = parseInt(year, 10);
  if (isNaN(y) || y >= BASE_YEAR) return 0;
  const age = BASE_YEAR - y;
  return age >= 10 ? 10 : age;
}

/**
 * Clasifica automáticamente el vehículo según las notas 1, 2, 3 y 4 de la CGR.
 * 
 * Nota 1 (Rural):
 * Cumplir simultáneamente con:
 * a) Carrocería tipo rural, familiar o 'pick up'.
 * b) Motor de más de 2.200 cc.
 * c) Doble tracción (4x4).
 * 
 * Nota 2 (Liviano):
 * Todos los vehículos que no clasifiquen como rural y que no sean motocicletas.
 * 
 * Nota 3 (Liviano Gasolina A):
 * Motor de hasta 1.600 cc.
 * 
 * Nota 4 (Liviano Gasolina B):
 * Motor de más de 1.600 cc.
 * 
 * @param {Object} vehicle
 * @returns {Object} { category, label, notes, rate }
 */
export function classifyVehicle(vehicle) {
  const {
    bodyType = 'sedan',     // 'sedan', 'rural_pickup', 'moto'
    fuel = 'gasolina',       // 'gasolina', 'diesel', 'hibrido', 'electrico'
    engineCc = 1600,         // número en cc
    year = BASE_YEAR
  } = vehicle || {};

  const cc = parseFloat(engineCc) || 0;
  const age = calculateAge(year);
  let category = CATEGORIES.LIVIANO_GASOLINA_A;
  let notes = [];

  if (bodyType === 'moto') {
    if (fuel === 'electrico') {
      category = CATEGORIES.MOTO_ELECTRICA;
      notes.push('Motocicleta con propulsión 100% eléctrica.');
    } else {
      category = CATEGORIES.MOTO_GASOLINA;
      notes.push('Motocicleta con motor a combustión (gasolina).');
    }
  } else if (fuel === 'electrico') {
    category = CATEGORIES.ELECTRICO;
    notes.push('Vehículo 100% eléctrico.');
  } else if (fuel === 'hibrido') {
    category = CATEGORIES.HIBRIDO;
    notes.push('Vehículo con propulsión híbrida.');
  } else {
    // Requisitos de Vehículo Rural: Carrocería rural / familiar / pick-up y motor > 2.200 cc
    const isRuralBody = bodyType === 'rural_pickup';
    const isLargeEngine = cc > 2200;

    if (isRuralBody && isLargeEngine) {
      // Es Rural
      if (fuel === 'diesel') {
        category = CATEGORIES.RURAL_DIESEL;
        notes.push('Vehículo rural / familiar / pick up con motor > 2.200 cc (Diesel).');
      } else {
        category = CATEGORIES.RURAL_GASOLINA;
        notes.push('Vehículo rural / familiar / pick up con motor > 2.200 cc (Gasolina).');
      }
    } else {
      // Es Liviano
      if (fuel === 'diesel') {
        category = CATEGORIES.LIVIANO_DIESEL;
        notes.push('Vehículo liviano con motor diesel.');
      } else {
        // Gasolina: Liviano A (<=1600) vs Liviano B (>1600)
        if (cc <= 1600) {
          category = CATEGORIES.LIVIANO_GASOLINA_A;
          notes.push('Vehículo liviano gasolina con motor hasta 1.600 cc.');
        } else {
          category = CATEGORIES.LIVIANO_GASOLINA_B;
          notes.push('Vehículo liviano gasolina con motor de más de 1.600 cc.');
        }
      }
    }
  }

  const rateRow = RATES_MATRIX[age] || RATES_MATRIX[RATES_MATRIX.length - 1];
  const rate = rateRow[category] || 0;

  return {
    category,
    label: CATEGORY_LABELS[category],
    age,
    rate,
    notes: notes.join(' ')
  };
}

/**
 * Obtiene la tarifa específica para una categoría y antigüedad dada.
 * @param {string} category 
 * @param {number} age (0 a 10)
 * @returns {number}
 */
export function getRate(category, age) {
  const clampedAge = Math.max(0, Math.min(10, parseInt(age, 10) || 0));
  const row = RATES_MATRIX[clampedAge];
  return row ? (row[category] || 0) : 0;
}
