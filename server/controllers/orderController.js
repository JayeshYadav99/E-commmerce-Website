import orderModel from "../models/orderModel.js";


export const createOrder= async(customer,data,lineItems)=>{
    try {
console.log("Data",data);
console.log("LineItems->OrderItems",lineItems);
      // const items=JSON.parse(lineItems.data);


        //   group cart items by shopId
      
      
  
        
          const order = await orderModel .create({
            user:customer.metadata.userId,
            customerId:data.customer,
            cart: lineItems,
            paymentInfo:{
              id:data.payment_intent,
              status:data.payment_status,
              type:data.payment_method_types[0],
              customerId:data.customer,

            },
            totalPrice:data.amount_total/100,
            shippingAddress:data.customer_details
            // cart: cart.items,
            // shippingAddress,
            // user,
            // totalPrice,
            // paymentInfo,
          });
          
        // res.status(201).json({
        //   success: true,
        //   order,
        // });
  
    } catch (error) {
       console.log(error);
    // res.status(500).send({
    //   success: false,
    //   error,
    //   message: "Error in Creating order",
    // });  
    }
}

export const getOrderForUser=async(req,res)=>{
  try {
    const orders=await orderModel.find({user:req.params.userId}).populate("user");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting orders",
    });
  }
}

export const getOrderByOrderId=async(req,res)=>{  
  try {
    const order=await orderModel.findById(req.params.orderId).populate("user");
    res.status(200).json({
      success: true,
      order,
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting order",
    });
    
  }
}