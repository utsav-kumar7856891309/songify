import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();
export const protectRoute = async (req, res, next) => {
	if (!req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}

		next();
	} catch (error) {
		next(error);
	}
};
export const checker=async(req,res,next)=>{
	try{
		const curr=await clerkClient.users.getUser(req.auth.userId);
		res.json({
		envEmail: process.env.ADMIN_EMAIL,
		userEmail: user.primaryEmailAddress?.emailAddress
	});
	}catch(error){
		next(error);
	}
}