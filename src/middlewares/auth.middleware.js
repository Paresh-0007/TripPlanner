import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware to verify JSON Web Tokens (JWT)
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
        // console.log(token)
        // Check if the token is present
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify the token and extract the user information
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by the decoded token ID
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // Check if the user exists
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach the user object to the request for later use
        req.user = user;
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
