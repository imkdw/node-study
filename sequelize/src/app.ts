import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = new Sequelize("sequelize", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

class Product extends Model {}
Product.init(
  {
    title: DataTypes.STRING,
  },
  { sequelize, modelName: "product" }
);

class User extends Model {}
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

class Address extends Model {}
Address.init(
  {
    type: DataTypes.STRING,
    line1: DataTypes.STRING,
    line2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
  },
  { sequelize, modelName: "address" }
);

// We save the return values of the association setup calls to use them later
Product.User = Product.belongsTo(User);
User.Addresses = User.hasMany(Address);
// Also works for `hasOne`
