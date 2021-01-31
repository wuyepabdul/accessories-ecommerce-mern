import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route Get /api/products
// @access Public

export const getProductsController = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (products) {
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else {
      res.status(404).json({ message: "No Products found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Fetch a single product
// @route Get /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProductController = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (product) {
      await product.remove();
      res.json({ message: `Product {${product.name}} deleted ` });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Create a product
// @route POST /api/products/
// @access Private/Admin
export const createProductController = asyncHandler(async (req, res) => {
  try {
    /*   const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    } = req.body; */
    const product = new Product({
      name: "Sample name",
      price: "0",
      user: req.user._id,
      image: "image",
      brand: "Sample Brand",
      category: "sample category",
      countInStock: 0,
      numReviews: 0,
      description: "sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error.message);
    console.log(req.user);
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProductController = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    } = req.body;

    const product = await Product.findById(req.params.productId);
    if (product) {
      product.name = name;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.description = description;

      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Create a Review
// @route POST /api/products/:id/reviews
// @access Private
export const createProductReviewController = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400).json({ message: "Product already reviewed" });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Fetch top rated products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});
