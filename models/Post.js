import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.js";

export class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            // the datatype is text instead of string. String has a max length and text does not
            type: DataTypes.TEXT,
            allowNull: false,
            // minimum length is one character
            validate: {
                len: [1],
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        // this is set to true to track the creation and modification times of records
        timestamps: true,
        // the table name will match the model name, otherwise the ORM will pluralize the model name for the table 
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
);