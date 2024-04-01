import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import calcPrices from "../utils/calcPrices.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const productsFromDb = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const finalOrders = orderItems.map((clientItem) => {
      const matchedDbItem = productsFromDb.find(
        (item) => item._id.toString() === clientItem._id
      );
      return {
        ...matchedDbItem,
        product: clientItem._id,
        price: matchedDbItem.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(
      finalOrders
    );

    const newOrder = new Order({
      orderItems: finalOrders,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const orderCreated = await newOrder.save();
    res.status(201).json(orderCreated);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({}).populate("user", "id name");
  res.json(allOrders);
});

export { addOrderItems, getOrders };
