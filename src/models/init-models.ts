import type { Sequelize } from "sequelize";
import { reservations as _reservations } from "./reservations";
import type {
  reservationsAttributes,
  reservationsCreationAttributes,
} from "./reservations";
import sequelize from "../config/database";

export { _reservations as reservations };

export type { reservationsAttributes, reservationsCreationAttributes };

export function initModels() {
  const reservations = _reservations.initModel(sequelize);

  return {
    reservations: reservations,
  };
}
