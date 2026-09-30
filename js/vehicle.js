/**
 * vehicle.js - Manejo simplificado del vehículo activo según criterios de la tabla de tarifas CGR
 * (Marca, Modelo, Año, Motor/Cilindrada, Tipo de Combustible, 4x4/Carrocería para Nota 1 CGR)
 */

import { classifyVehicle, BASE_YEAR } from './rates.js';
import { Storage, DEFAULT_VEHICLES } from './storage.js';

export class VehicleManager {
  constructor(onChangeCallback) {
    this.onChange = onChangeCallback || (() => {});
    this.vehicles = Storage.getVehicles();
    this.activeVehicle = Storage.getActiveVehicle();
  }

  getVehicles() {
    return this.vehicles;
  }

  getActiveVehicle() {
    return this.activeVehicle;
  }

  setActiveVehicle(vehicleId) {
    const found = this.vehicles.find(v => v.id === vehicleId);
    if (found) {
      this.activeVehicle = found;
      Storage.setActiveVehicleId(vehicleId);
      this.onChange();
    }
  }

  saveVehicle(vehicleData) {
    const id = vehicleData.id || ('veh-' + Date.now());
    const vehicle = {
      id,
      brand: vehicleData.brand || 'Vehículo',
      model: vehicleData.model || '',
      year: parseInt(vehicleData.year, 10) || BASE_YEAR,
      engineCc: parseFloat(vehicleData.engineCc) || 0,
      fuel: vehicleData.fuel || 'gasolina',
      bodyType: vehicleData.bodyType || 'sedan'
    };

    Storage.saveOrUpdateVehicle(vehicle);
    this.vehicles = Storage.getVehicles();
    this.activeVehicle = vehicle;
    this.onChange();
    return vehicle;
  }

  deleteVehicle(id) {
    this.vehicles = Storage.deleteVehicle(id);
    this.activeVehicle = Storage.getActiveVehicle();
    this.onChange();
  }

  /**
   * Obtiene la clasificación CGR y tarifa del vehículo activo
   */
  getActiveClassification() {
    return classifyVehicle(this.activeVehicle);
  }
}
