import { vehicleModel } from "../models/vehicle.model";
import { Vehicle, VehicleStatus } from "../types";

export default async function vehiclesSeed() {
  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement<T>(array: T[]): T {
    return array[getRandomInt(0, array.length - 1)];
  }

  const brands = [
    "Chevrolet",
    "Ford",
    "Honda",
    "Nissan",
    "Toyota",
    "BMW",
    "Audi",
    "Mercedes",
    "Volkswagen",
    "Hyundai",
  ];
  const models = [
    "Malibu",
    "Focus",
    "Civic",
    "Sentra",
    "Corolla",
    "X5",
    "A4",
    "C-Class",
    "Golf",
    "Elantra",
  ];
  const statuses = [
    VehicleStatus.AVAILABLE,
    VehicleStatus.IN_SERVICE,
    VehicleStatus.IN_MAINTENANCE,
  ];

  const vehicles: Vehicle[] = [];

  for (let i = 0; i < 50; i++) {
    vehicles.push({
      brand: getRandomElement(brands),
      model: getRandomElement(models),
      year: getRandomInt(1990, 2024),
      status: getRandomElement(statuses),
    });
  }

  for (const vehicle of vehicles) {
    const newVehicle = new vehicleModel(vehicle);
    await newVehicle.save();
    console.log(
      `Vehicle ${vehicle.brand} ${vehicle.model} created successfully!`,
    );
  }

  console.log("Vehicle seeding completed successfully!");
}
