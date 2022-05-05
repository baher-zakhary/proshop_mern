import asyncHandler from "express-async-handler"

export const getPaypalConfig = asyncHandler((req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})
