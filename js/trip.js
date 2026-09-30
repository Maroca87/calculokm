/**
 * trip.js - Lógica de cálculo de tramos, kilometraje oficial y estimación complementaria de gasolina.
 */

export class TripManager {
  constructor(vehicleManager, onChangeCallback) {
    this.vehicleManager = vehicleManager;
    this.onChange = onChangeCallback || (() => {});

    this.origin = {
      name: '',
      lat: null,
      lon: null
    };

    this.destinations = [
      { id: 'dest-1', name: '', distanceKm: 0, lat: null, lon: null }
    ];

    this.date = new Date().toISOString().split('T')[0];
  }

  setOrigin(name, lat = null, lon = null) {
    this.origin = {
      name: (name || '').trim(),
      lat: lat !== null ? lat : (this.origin ? this.origin.lat : null),
      lon: lon !== null ? lon : (this.origin ? this.origin.lon : null)
    };
    this.notify();
  }

  addDestination(name = '', distanceKm = 0, lat = null, lon = null) {
    const newDest = {
      id: 'dest-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      name: name || `Destino ${this.destinations.length + 1}`,
      distanceKm: Math.max(0, parseFloat(distanceKm) || 0),
      lat,
      lon
    };
    this.destinations.push(newDest);
    this.notify();
    return newDest;
  }

  updateDestination(id, partial) {
    const dest = this.destinations.find(d => d.id === id);
    if (dest) {
      if (partial.distanceKm !== undefined) {
        partial.distanceKm = Math.max(0, parseFloat(partial.distanceKm) || 0);
      }
      Object.assign(dest, partial);
      this.notify();
    }
  }

  removeDestination(id) {
    if (this.destinations.length <= 1) {
      this.destinations = [{
        id: 'dest-' + Date.now(),
        name: '',
        distanceKm: 0,
        lat: null,
        lon: null
      }];
    } else {
      this.destinations = this.destinations.filter(d => d.id !== id);
    }
    this.notify();
  }

  moveDestination(id, direction) {
    const index = this.destinations.findIndex(d => d.id === id);
    if (index < 0) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < this.destinations.length) {
      const temp = this.destinations[index];
      this.destinations[index] = this.destinations[newIndex];
      this.destinations[newIndex] = temp;
      this.notify();
    }
  }

  setDate(date) {
    this.date = date;
    this.notify();
  }

  /**
   * Desglose ordenado de tramos: Origen -> Destino 1 -> Destino 2 -> ... (finaliza en el último destino)
   */
  getLegs() {
    const legs = [];
    let previousPoint = this.origin.name || 'Origen';

    this.destinations.forEach((dest, index) => {
      legs.push({
        index: index + 1,
        from: previousPoint,
        to: dest.name || `Destino ${index + 1}`,
        distanceKm: Math.round((dest.distanceKm || 0) * 10) / 10
      });
      previousPoint = dest.name || `Destino ${index + 1}`;
    });

    return legs;
  }

  /**
   * Cálculo general del recorrido:
   * KM TOTALES x TARIFA = TOTAL A COBRAR
   * Gasolina secundaria
   */
  calculate() {
    const legs = this.getLegs();
    const totalKm = legs.reduce((acc, leg) => acc + leg.distanceKm, 0);
    const roundedTotalKm = Math.round(totalKm * 10) / 10;

    const classification = this.vehicleManager.getActiveClassification();
    const ratePerKm = classification.rate || 0;

    // Fórmula principal: KM TOTALES x TARIFA = TOTAL A COBRAR
    const totalToCharge = Math.round(roundedTotalKm * ratePerKm);

    return {
      totalKm: roundedTotalKm,
      legs,
      ratePerKm,
      totalToCharge,
      vehicle: this.vehicleManager.getActiveVehicle(),
      classification
    };
  }

  createTripState() {
    return {
      date: this.date,
      origin: this.origin,
      destinations: JSON.parse(JSON.stringify(this.destinations))
    };
  }

  loadTripState(state) {
    if (!state) return;
    if (state.origin) this.origin = typeof state.origin === 'string' ? { name: state.origin } : state.origin;
    if (state.destinations && state.destinations.length > 0) {
      this.destinations = JSON.parse(JSON.stringify(state.destinations));
    }
    if (state.date) this.date = state.date;
    this.notify();
  }

  reset() {
    this.origin = { name: '', lat: null, lon: null };
    this.destinations = [
      { id: 'dest-' + Date.now(), name: '', distanceKm: 0, lat: null, lon: null }
    ];
    this.date = new Date().toISOString().split('T')[0];
    this.notify();
  }

  notify() {
    this.onChange();
  }
}
