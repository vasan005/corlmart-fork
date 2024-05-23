import mongoose from "mongoose";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validateEmail,
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    phone: {
      type: String,
      // required: true,
      min: [10, "Enter valid phone number"],
    },
    password: {
      type: String,
      // required: true,
    },
    confirmpassword: {
      type: String,
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: () => true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
    address:[{
      FirstName: String,
      SecondName: String,
      addressLine1 : String,
      addressLine2 : String,
      country : String,
      region: String,
      city : String,
      state : String,
      zipcode : String,
      isDefault: {
          type: Boolean,
          default: () => false
      }     
  }],
  verifiedEmail:{
    type:Boolean,
    default : false
  },
//   wallet:[{
//     amount: Number,
//     timestamp: {
//         type: Date,
//         default: () => Date.now()
//     },
//     transaction: String,
//     remarks: String
// }],
  },
);

const User = mongoose.model("User", userSchema);

export default User;
