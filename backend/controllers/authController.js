import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";

const createToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signup = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: "Authentication is not configured on the server" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await sql`
            INSERT INTO users (email, password)
            VALUES (${email}, ${hashedPassword})
            RETURNING id, email
        `;

        const token = createToken(user[0].id);

        res.status(201).json({
            token,
            user: user[0]
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: "Authentication is not configured on the server" });
    }

    try {
        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = createToken(user.id);

        res.status(200).json({
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
