import { vehicleModel } from "../models/vehicle.model";
import { Vehicle, VehicleStatus } from "../types";

export default async function vehiclesSeed() {
  const vehicles: Vehicle[] = [
    {
      brand: "Chevrolet",
      model: "Malibu",
      year: 2021,
      status: VehicleStatus.AVAILABLE,
    },
    {
      brand: "Ford",
      model: "Focus",
      year: 2018,
      status: VehicleStatus.IN_SERVICE,
    },
    {
      brand: "Honda",
      model: "Civic",
      year: 2019,
      status: VehicleStatus.IN_MAINTENANCE,
    },
    {
      brand: "Nissan",
      model: "Sentra",
      year: 2022,
      status: VehicleStatus.IN_SERVICE,
    },
    {
      brand: "Toyota",
      model: "Corolla",
      year: 2020,
      status: VehicleStatus.AVAILABLE,
    },
  ];

  for (const vehicle of vehicles) {
    const newVehicle = new vehicleModel(vehicle);
    await newVehicle.save();
    console.log(
      `Vehicle ${vehicle.brand} ${vehicle.model} created successfully!`,
    );
  }

  console.log("Vehicle seeding completed successfully!");
}
