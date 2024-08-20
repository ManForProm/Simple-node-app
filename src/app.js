import cors from 'cors';
import express from 'express';
import http from 'http';
import 'reflect-metadata';
import tasksRouter from './routes/tasks.js';
import usersRouter from './routes/users.js';
import sequelize from './services/SequelizeClient.js';

const PORT = process.env.NODE_DOCKER_PORT || 8080;
const app = express();

app.use(cors({ origin: '*'}));
app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

const startServer = async () => {
    try {
        await sequelize.sync();  // Синхронизация базы данных
        console.log('Database synced successfully.');

        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });

    } catch (e) {
        console.error(`Error occurred: ${e.message}`);
    }
}

startServer();  // Запуск сервера