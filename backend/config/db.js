import {neon} from "@neondatabase/serverless"
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD }=process.env;
// # postgresql://neondb_owner:npg_mnOb6V1IqyLQ@ep-wispy-hall-aqvpqnui-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
// console.log(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);
export const sql=neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

