import {neon} from "@neondatabase/serverless"
import dotenv from "dotenv";

dotenv.config();

// TODO: hello

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD }=process.env;
export const sql=neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

