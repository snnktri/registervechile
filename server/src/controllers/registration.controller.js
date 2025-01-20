import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { Registration } from "../models/registration.model.js";
import { Vehicle } from "../models/vehicle.model.js";

const registerVehicle = asyncHandler( async(req, res) => {
    //get the vehicle details from the form
    //find any value is empty or not
    //check user to find user exist or not
    //check if the vehicle is already registered or not
    //check jwt token to find user log in or not
    //insert the data into databse
    //find data is inserted or not
    //return the response

    const { registrationDate,expiryDate, status, registrationStatus } = req.body;

    //console.log(req.body);

    if([registrationDate, status, expiryDate, registrationStatus].some(field => field?.trim()==="")) {
        throw new ApiError(400, "All fields must be filled.");
    }

    const ownerId = req.user._id;
    const vehicleId = await Vehicle.findOne({
        owner: ownerId
    })

    const existUser = await User.findById(ownerId);

    console.log(existUser);
    if(!existUser) {
        throw new ApiError(409, "User does not exist.");
    }

    

    const existVehicle = await Vehicle.findById(vehicleId);
    console.log(existVehicle)
    if(!existVehicle) {
        throw new ApiError(409, "Vechile does not exist.");
    }

    const registration = await Registration.findOne({
         vehicle: vehicleId 
      });
    if(registration) {
        throw new ApiError(409, "Vehicle already registered.");
    }

    const regVehicle = await Registration.create({
        vehicle: vehicleId,
        owner: ownerId,
        registrationDate,
        expiryDate,
        status,
        registrationStatus
    })

    const enterVehicle = await Registration.findById(regVehicle._id);

    if(!enterVehicle) {
        throw new ApiError(409, "Vechile reg failed.")
    }

    return res.
    status(201).
    json(new ApiResponse(
        201,
        { vehicle: enterVehicle },
        "Vechile registration successfull"
    ));
 });

const getDetailsOfRegVech = asyncHandler( async (req, res) =>{
    const ownerId = req.user._id;

    if(!ownerId) {
        throw new ApiError(401, "User not logged in.");
    }
    const vehicleId = await Vehicle.findOne({
        owner: ownerId
    })

    if(!vehicleId) {
        throw new ApiError(404, "Vehicle not found.");
    }
    const registrationDetails = await Registration.findOne({
                                    owner: ownerId
                                }).populate({path: "owner", select: "firstName email profile"}).
                                populate({path: "vehicle", select: "registrationNumber model make color engineNumber photo"}).
                                exec();

   if(!
    registrationDetails) {
        throw new ApiError(404, "No vehicle registration found.");
    }
    return res.
    status(200).
    json(new ApiResponse(
        200,
        { registrationDetails },
        "Registration details fetched successfully"
    ));
})


const changeRegistrationDetails = asyncHandler( async (req, res) => {
    const ownerId = req.user._id;

    if(!ownerId) {
        throw new ApiError(401, "User not logged in.");
    }
    
    const user = await User.findById(ownerId);

    console.log(user);
})

const getAll = asyncHandler( async (req, res) => {
    const registrations = await Registration.find().
                         populate({path: "owner", select: "firstName email profile"}).
                         populate({path: "vehicle", select: "registrationNumber model make color engineNumber photo"}).
                         exec();
    return res.status(200).
    json(
        new ApiResponse(
            200,
            { registrations },
            "All registration details fetched successfully"
        )
    )
})


 export { registerVehicle,
    getDetailsOfRegVech,
getAll };