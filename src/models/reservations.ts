import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface reservationsAttributes {
  id?: number;
  title: string;
  invited_people: object[];
  session_description: string;
  started_time: string;
  end_time: string;
  table_id: string;
}

export type reservationsPk = "id";
export type reservationsId = reservations[reservationsPk];
export type reservationsOptionalAttributes = "id";
export type reservationsCreationAttributes = Optional<
  reservationsAttributes,
  reservationsOptionalAttributes
>;

export class reservations
  extends Model<reservationsAttributes, reservationsCreationAttributes>
  implements reservationsAttributes
{
  id?: number;
  title!: string;
  invited_people!: object[];
  session_description!: string;
  started_time!: string;
  end_time!: string;
  table_id!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof reservations {
    return reservations.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        invited_people: {
          type: DataTypes.ARRAY(DataTypes.JSON),
          allowNull: false,
        },
        session_description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        started_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        table_id: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "reservations",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "reservations_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
