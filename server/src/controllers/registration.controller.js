import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { Registration } from "../models/registration.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";
import axios from "axios";

const registerVehicle = asyncHandler( async(req, res) => {
    //get the vehicle details from the form
    //find any value is empty or not
    //check user to find user exist or not
    //check if the vehicle is already registered or not
    //check jwt token to find user log in or not
    //insert the data into databse
    //find data is inserted or not
    //return the response

    const { registrationDate,expiryDate, status, registrationStatus, registrationFee } = req.body;

    //console.log(req.body);

    if([registrationDate, status, expiryDate, registrationStatus].some(field => field?.trim()==="")) {
        throw new ApiError(400, "All fields must be filled.");
    }

    const transaction_uuid = uuidv4();

    console.log("UUID:"+transaction_uuid);

    const parsedAmount = parseFloat(registrationFee);

    const dataToHash = `total_amount=${parsedAmount},transaction_uuid=${transaction_uuid},product_code=${process.env.MERCHANT_ID}`;


    const secretId = process.env.SECRET;

    const signature = crypto.createHmac('sha256', secretId)
                         .update(dataToHash)
                         .digest('base64');

    let paymentData = {
        amount: parsedAmount,
        failure_url: process.env.FAILURE_URL,
        product_code: process.env.MERCHANT_ID,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: process.env.SUCCESS_URL,
        product_delivery_charge: "0",
        product_service_charge: "0",
        tax_amount: "0",
        total_amount: registrationFee,
        transaction_uuid: transaction_uuid,
        signature: signature
      };

      console.log(paymentData);


    const ownerId = req.user._id;
    //console.log(ownerId);
    const vehicleId = await Vehicle.findOne({
        owner: ownerId
    })

    const existUser = await User.findById(ownerId);

   // console.log(existUser);
    if(!existUser) {
        throw new ApiError(409, "User does not exist.");
    }

    

    const existVehicle = await Vehicle.findById(vehicleId);
   // console.log(existVehicle)
    if(!existVehicle) {
        throw new ApiError(409, "Vechile does not exist.");
    }

    const registration = await Registration.findOne({
         vehicle: vehicleId 
      });
    if(registration) {
        throw new ApiError(409, "Vehicle already registered.");
    }

    // payment gateway

    // try {
    //     const paymentResponse = await axios.post(process.env.ESEWAPAYMENT_URL, null, {
    //       params: paymentData,
    //     });

    //     if (paymentResponse.status !== 200) {
    //         throw new ApiError(500, "Payment Gateway Error: Payment Failed");
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.error('Error Response Data:', error.response.data);
    //       console.error('Error Response Status:', error.response.status);
    //       console.error('Error Response Headers:', error.response.headers);
    //       throw new ApiError(error.response.status, `Payment Gateway Error: ${error.response.data.message || 'Unknown error'}`);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       console.error('Error Request Data:', error.request);
    //       throw new ApiError(500, 'No response from payment gateway');
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.error('Error Message:', error.message);
    //       throw new ApiError(500, `Request setup failed: ${error.message}`);
    //     }
    //   }
    
        const paymentResponse = await axios.post(process.env.ESEWAPAYMENT_URL, null, {
          params: paymentData,
        });

        if (paymentResponse.status !== 200) {
            throw new ApiError(500, "Payment Gateway Error: Payment Failed");
        }

    const regVehicle = await Registration.create({
        vehicle: vehicleId,
        owner: ownerId,
        registrationDate,
        expiryDate,
        status,
        registrationStatus,
        registrationFee,
    })

    const enterVehicle = await Registration.findById(regVehicle._id);

    if(!enterVehicle) {
        throw new ApiError(409, "Vechile reg failed.")
    }

    return res.
    status(201).
    json(new ApiResponse(
        201,
        { vehicle: enterVehicle,
         },
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