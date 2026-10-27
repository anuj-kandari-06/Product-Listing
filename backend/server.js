import connectDB from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import User from "./User.js";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(
    session({
        name: "shopmart.sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
        }),
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);
app.get("/", (req, res) => {
    res.send("ShopMart Backend is running!");
});

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedMobile = mobile.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^[6-9]\d{9}$/;

        if (!emailPattern.test(normalizedEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }
        if (!mobilePattern.test(normalizedMobile)) {
            return res.status(400).json({
                message: "Enter a valid mobile number",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        }
        const existingUser = await User.findOne({
            $or: [
                { email: normalizedEmail },
                { mobile: normalizedMobile },
            ],
        });

        if (existingUser) {
            if(existingUser.email === normalizedEmail){
 return res.status(400).json({
                message: "Email already registered. Please login.",
            });
            }
            return res.status(400).json({
                message: "Mobile number already registered.Please login.",
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            mobile: normalizedMobile,
            password: hashedPassword,
        });
        req.session.userId = newUser._id.toString();
        await new Promise((resolve, reject) => {
            req.session.save((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
        return res.status(200).json({
            message: "Registration Successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already registered. Please login",
            });
        }
        console.error("Registration error:", error.message);
        return res.status(500).json({
            message: "Registration failed.Please try again.",
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or Password",
            });
        }
        req.session.userId = user._id.toString();
        await new Promise((resolve, reject)=>{
            res.session.save((error)=>{
                if(error){
                    reject(error);
                }else{
                    resolve();
                }
            });
        });
        return res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            message: "Login failed.Please try again.",
        });
    }
});

app.get("/api/me", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                message: "Not logged in",
            });
        }
        const user = await User.findById(req.session.userId)
            .select("-password");
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            message: "User authenticated",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Session check error:", error.message);
        return res.status(500).json({
            message: "Unable to check session",
        });
    }
});


app.get("/api/cart-wishlist", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                message: "Please login first",
            });
        }

        const user = await User.findById(req.session.userId)
            .select("cartItems wishlistItems");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            cartItems: user.cartItems,
            wishlistItems: user.wishlistItems,
        });
    } catch (error) {
        console.error("Load cart error:", error.message);

        return res.status(500).json({
            message: "Failed to load cart and wishlist",
        });
    }
});

app.put("/api/cart-wishlist", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                message: "Please login first",
            });
        }

        const { cartItems, wishlistItems } = req.body;
        const updateData = {};

        if (Array.isArray(cartItems)) {
            updateData.cartItems = cartItems;
        }

        if (Array.isArray(wishlistItems)) {
            updateData.wishlistItems = wishlistItems;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "Cart or wishlist data is required",
            });
        }

        const user = await User.findByIdAndUpdate(
            req.session.userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("cartItems wishlistItems");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "Cart and wishlist saved",
            cartItems: user.cartItems,
            wishlistItems: user.wishlistItems,
        });
    } catch (error) {
        console.error("Save cart error:", error.message);

        return res.status(500).json({
            message: "Failed to save cart and wishlist",
        });
    }
});


app.post("/api/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout error:", error.message);
            return res.status(500).json({
                message: "Logout failed",
            });
        }
        res.clearCookie("shopmart.sid", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        return res.status(200).json({
            message: " Logout Successful",
        });
    });
});
const PORT = 5000;

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();
