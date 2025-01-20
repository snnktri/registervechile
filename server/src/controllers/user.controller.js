import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessRefressToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });


        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error on generating access and refresh tokens:"+ error)
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from the form
    const { firstName, lastName, email, password, phoneNumber, nagriktaNumber, state,role, district} = req.body;

    // Check if any of the required fields are empty
    if ([firstName, lastName, email, password, phoneNumber, nagriktaNumber, state, district].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields must be filled.");
    }
    // Check if the user already exists
    const existUser = await User.findOne({ email: email });
    if (existUser) {
        throw new ApiError(409, "User already exists.");
    }

    // Check if profile picture is uploaded
    const localFilePath = req.file?.path;
    if (!localFilePath) {
        throw new ApiError(400, "Please upload a profile picture.");
    }

    // Upload profile picture to Cloudinary
    const profile = await uploadOnCloudinary(localFilePath);
    if (!profile) {
        throw new ApiError(500, "Error on uploading profile picture.");
    }

    //if user is admin throw error
    if(role === 'admin'){
        throw new ApiError(403, "Admin role is not allowed for registration.");
    }

    // Create a new user including the address
    const newUser = await User.create({
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        nagriktaNumber,
        profile: profile.url,
        district,
        state,
        role // Save the address from the form data
    });

    // Fetch the newly created user (without sensitive data like password and refreshToken)
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

    // If the user creation failed, throw an error
    if (!createdUser) {
        throw new ApiError(500, "User is not created.");
    }

    // Respond with a success message
    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully."));
});


const loginUser = asyncHandler( async(req, res) => {
    //get a user details from the from
    //verify user is exist or not from the register users
    //generate a jwt token
    //set the secure cookie (http)
    //return the response with sucess

    const {email, password} = req.body;

    //console.log(req.body)

    if (!email || email.trim() === "") {
        throw new ApiError(400, "Email should be provided.");
    }

    const user = await User.findOne({email: email});
    if(!user) {
        throw new ApiError(401, "Email is not correct.")
    }

    //if role is not user throw error

    // if(user.role !== 'user'){
    //     throw new ApiError(403, "User role is not allowed for login.");
    // }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(401, "Password is not correct.")
    }

    const { accessToken, refreshToken } = await generateAccessRefressToken(user._id);

    //console.log(`Access token: ${accessToken} and refresh token: ${refreshToken}`);

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        //secure: true
    }

    return res.
    status(200).
    cookie("accessToken", accessToken, options).
    cookie("refreshToken", refreshToken, options).
    json(new ApiResponse(
        200,
        {user: loggedUser, accessToken, refreshToken},
        "User logged in successfully."
    )
    );
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        //secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
});

const adminLogin = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    if (!email || email.trim() === "") {
        throw new ApiError(400, "Email should be provided.");
    }

    const user = await User.findOne({email: email});
    if(!user) {
        throw new ApiError(401, "Email is not correct.")
    }

    if (user.email !== "ktrisnk@gmail.com")
        throw new ApiError(401, "Invalid email.")

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid) {
        throw new ApiError(401, "Password is not correct.")
    }

    const { accessToken, refreshToken } = await generateAccessRefressToken(user._id);

    return res.
    status(200).
    cookie("accessToken", accessToken, { httpOnly: true }).
    cookie("refreshToken", refreshToken, { httpOnly: true }).
    json(new ApiResponse(
        200,
        {user: user, accessToken, refreshToken},
        "Admin logged in successfully."
    )
    );
})



export { registerUser, loginUser, logoutUser, adminLogin };