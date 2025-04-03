import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        port: Number(process.env.DB_PORT),
        logging: false,
        dialectOptions: {
            options: { encrypt: false }
        }
    }
);

export const dbConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};
