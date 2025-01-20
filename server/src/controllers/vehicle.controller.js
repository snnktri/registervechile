import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { Vehicle } from "../models/vehicle.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const createVehilce = asyncHandler(async(req, res) => {
    const { registrationNumber, vin, model, color, year, engineNumber,make } = req.body;

    const userId = req.user._id;

    if([registrationNumber, vin, model, color, year,make].some(field => field?.trim()==="")) {
        throw new ApiError(400, "All fields are required");
    }

    const owner = await User.findById(userId);

    if(!owner) {
        throw new ApiError(404, "User not found");
    }

    const localFilePath = req.file?.path;
    console.log(localFilePath);
    if (!localFilePath) {
        throw new ApiError(400, "Please upload a picture of vehicles.");
    }

    // Upload profile picture to Cloudinary
    const vehiclePoto = await uploadOnCloudinary(localFilePath);
    if (!vehiclePoto) {
        throw new ApiError(500, "Error on uploading profile picture.");
    }

    const vehicle = await Vehicle.create({
        owner: userId,
        registrationNumber,
        vin,
        model,
        color,
        engineNumber,
        make,
        year,
        photo: vehiclePoto.url
    })

    const createdVehicle = await Vehicle.findById(vehicle._id);

    if(!createdVehicle) {
        throw new ApiError(500, "Vehicle not created");
    }

    return res.
    status(201).
    json(new ApiResponse(
        201,
        createdVehicle,
        "Vehile created successfully"
    ))
})

const getDetails = asyncHandler(async (req, res) => {
    
    const ownerID = req.user._id;

    const vehicleDetails = await Vehicle.findOne({ owner: ownerID }).populate(
        { path: "owner", select: "firstName email" } 
    );

    // If vehicle details not found, return an error
    if (!vehicleDetails) {
        throw new ApiError(404, "Vehicle not found");
    }

    // Return the vehicle details in the response
    return res.status(200).json(new ApiResponse(
        200,
        vehicleDetails,
        "Vehicle details retrieved successfully"
    ));
});


export { createVehilce,
    getDetails };