import { DataTypes, Model } from 'sequelize'
import sequelize from '../utils/sequelize'

class Employee extends Model {
  public emp_no!: number
  public first_name!: string
  public last_name!: string
  public hire_date!: number
}

Employee.init(
  {
    emp_no: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'employees',
    timestamps: false, // Disable createdAt & updatedAt
  }
)

export default Employee
