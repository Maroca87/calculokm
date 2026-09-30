/**
 * report.js - Resumen de justificación para ver, compartir e imprimir
 */

export function formatCurrency(amount) {
  const num = Math.round(Number(amount) || 0);
  return '₡ ' + num.toLocaleString('es-CR');
}

export function formatKm(km) {
  const val = Number(km) || 0;
  return val.toFixed(1) + ' km';
}

export function generateJustificationText(tripCalc) {
  const v = tripCalc.vehicle || {};
  const c = tripCalc.classification || {};
  const legsText = tripCalc.legs.map(l => `  • ${l.from} → ${l.to} = ${formatKm(l.distanceKm)}`).join('\n');

  return `RESUMEN DE KILOMETRAJE Y COBRO
Fecha: ${tripCalc.date || new Date().toISOString().split('T')[0]}
Vehículo: ${v.brand || ''} ${v.model || ''} (${v.year || ''}) - ${c.label || ''}

RECORRIDO Y TRAMOS:
${legsText}

RESULTADO:
• KM TOTALES: ${formatKm(tripCalc.totalKm)}
• TARIFA OFICIAL: ${formatCurrency(tripCalc.ratePerKm)} / km
• TOTAL A COBRAR: ${formatCurrency(tripCalc.totalToCharge)}
`;
}

export function generateJustificationHtml(tripCalc) {
  const v = tripCalc.vehicle || {};
  const c = tripCalc.classification || {};
  const dateFormatted = tripCalc.date ? new Date(tripCalc.date + 'T12:00:00').toLocaleDateString('es-CR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : new Date().toLocaleDateString('es-CR');

  const rowsHtml = tripCalc.legs.map((leg, idx) => `
    <tr>
      <td style="text-align: center; font-weight: 600;">${idx + 1}</td>
      <td><strong>${escapeHtml(leg.from)}</strong> → <strong>${escapeHtml(leg.to)}</strong></td>
      <td style="text-align: right; font-weight: 700; font-family: monospace;">${formatKm(leg.distanceKm)}</td>
    </tr>
  `).join('');

  return `
    <div class="justification-paper" id="justification-print-content">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <h1 style="font-size: 18px; font-weight: 800; margin: 0; color: #0f172a; text-transform: uppercase;">
            Justificación y Cobro de Kilometraje
          </h1>
          <p style="font-size: 12px; color: #475569; margin: 2px 0 0 0;">
            Tarifas oficiales según Contraloría General de la República (CGR)
          </p>
        </div>
        <div style="text-align: right; font-size: 12px; color: #334155;">
          <div><strong>Fecha:</strong> ${dateFormatted}</div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
        <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px;">Vehículo Utilizado</div>
        <div style="font-size: 15px; font-weight: 700; color: #0f172a;">
          🚗 ${escapeHtml(v.brand || '')} ${escapeHtml(v.model || '')} (${v.year || ''})
        </div>
        <div style="font-size: 12px; color: #334155; margin-top: 2px;">
          Categoría: <strong>${escapeHtml(c.label || 'Liviano')}</strong> | Motor: ${v.engineCc ? v.engineCc + ' cc' : 'N/A'} | Combustible: ${v.fuel || 'Gasolina'}
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-bottom: 6px; text-transform: uppercase;">
          Desglose de Recorrido por Tramos
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 1px solid #cbd5e1;">
              <th style="padding: 8px 6px; text-align: center; width: 35px;">#</th>
              <th style="padding: 8px; text-align: left;">Tramo</th>
              <th style="padding: 8px 6px; text-align: right; width: 100px;">Distancia</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
          <tfoot>
            <tr style="border-top: 2px solid #0f172a; font-weight: 800; font-size: 14px; background: #fafafa;">
              <td colspan="2" style="padding: 10px 8px; text-align: right;">KM TOTALES:</td>
              <td style="padding: 10px 8px; text-align: right; font-family: monospace; color: #0284c7;">
                ${formatKm(tripCalc.totalKm)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Resumen Principal Destacado -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Tarifa Oficial CGR</div>
          <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 4px;">
            ${formatCurrency(tripCalc.ratePerKm)} / km
          </div>
        </div>

        <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase;">TOTAL A COBRAR</div>
          <div style="font-size: 22px; font-weight: 900; color: #047857; margin-top: 4px;">
            ${formatCurrency(tripCalc.totalToCharge)}
          </div>
        </div>
      </div>

      <!-- Espacio para firmas -->
      <div style="display: flex; justify-content: space-around; margin-top: 36px; padding-top: 10px;">
        <div style="width: 200px; text-align: center; border-top: 1px solid #94a3b8; padding-top: 6px; font-size: 11px; color: #475569;">
          Firma de quien realizó el viaje
        </div>
        <div style="width: 200px; text-align: center; border-top: 1px solid #94a3b8; padding-top: 6px; font-size: 11px; color: #475569;">
          Firma y Visto Bueno
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
