import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import path from "path";
import { fileURLToPath } from "url";
import next from "next";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dev = process.env.NODE_ENV !== "production";
const frontendDir = path.join(__dirname, "../frontend");
const nextApp = next({ dev, dir: frontendDir });
const handle = nextApp.getRequestHandler();

await nextApp.prepare();

const app = express();
const PORT = process.env.PORT || 3000;

console.log(PORT);


app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy:false,
}));
app.use(morgan("dev"));

// apply arcjet
app.use(async (req,res,next)=>{
    try {
        const decision=await aj.protect(req,{
            requested:1 
        })
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({
                    error:"too many requests"
                })
            }
            else if(decision.reason.isBot()){
                res.status(403).json({error:"Bot access denied"});
            }
            else{
                res.status(403).json({error:"Forbidden"});
            }
            return 
        }

        if(decision.results.some((result)=> result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({error:"spoofed bot detected"});
            return;
        }

        next();
    } catch (error) {
        console.log("arcjet error",error);
        next(error);
    }
})

app.use("/api/products", productRoutes)

// Serve frontend routes through Next.js on the same port for both dev and production.
app.use((req, res) => {
    return handle(req, res);
});

async function initDB(){
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )
        `;
        console.log("database initialised successfully");
        
    } catch (error) {
        console.log("error");
        
    }
}


initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);  
})
})