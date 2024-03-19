import  { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/connection.js';

export class User extends Model {
    // checks to see if the password matches the hashed password
    checkPassword(loginPw){
        return bcrypt.compare(loginPw, this.password);
    }
}

// User model set up
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(15),
            allowNull:false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // minimum length of 8 characters
                len: [8]
            },
        },
    },
    {
        // these hooks ensure that passwords are hashed before being stored in the database
        hooks:{
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            beforeUpdate: async (updatedUser) => {
                if (updatedUser.changed('password')){
                    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                }
                return updatedUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored:true,
        modelName: 'user',
    }
);