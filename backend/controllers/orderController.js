import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new Order
// @route POST /api/orders
// @access Private

export const addOrderItemsController = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "No order Items" });
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc GET Order by id
// @route GET /api/orders/:id
// @access Private

export const getOrderByIdController = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error: try again" });
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private

export const updateOrderToPaidController = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true), (order.paidAt = Date.now());
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Update order to be delivered
// @route PUT /api/orders/:id/pay
// @access Private

export const updateOrderToDeliveredController = asyncHandler(
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        (order.isDelivered = true), (order.deliveredAt = Date.now());
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: "Order Not Found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error: try again later" });
    }
  }
);

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrdersController = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "No orders found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
export const getOrdersController = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    if (orders) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "No orders found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});
