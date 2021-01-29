import './config/env'
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import * as express from "express";
import { createDate } from './crud'
import { PostEntity, UserEntity } from './entity'


const apps = express()

// app.use(bodyParser.json())
// app.use(router)

const app = async () => {
    const connection: Connection = await createConnection({
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "123456",
        "database": "test_dome",
        "synchronize": true,
        "logging": true,
        "entities": [UserEntity, PostEntity],
        "migrations": ["src/migration/**/*.ts"],
        "subscribers": ["src/subscriber/**/*.ts"],

    })

    await connection.synchronize(true).catch(console.error)
    await createDate(connection)
}

app()

apps.listen(4000, () => {

    console.log("Express server has started on port 4000. Open http://localhost:4000 to see results");
})
