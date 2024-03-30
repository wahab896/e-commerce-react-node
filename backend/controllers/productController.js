import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
});

const getProductById = asyncHandler(async (req, res) => {
  const existingProduct = await Product.findById(req.params.id);
  if (existingProduct) {
    res.json(existingProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const sampleProduct = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "Brand 1",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await sampleProduct.save();
  res.status(201).json(createdProduct);
});

const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);

  res.json(topProducts);
});

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    // if (alreadyReviewed) {
    //   res.status(400);
    //   throw new Error("Product already reviewed");
    // }
    const newReview = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numReviews;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
  } = req.body;
  const existingProduct = await findById(req.params.id);

  if (existingProduct) {
    existingProduct.name = name;
    existingProduct.image = image;
    existingProduct.brand = brand;
    existingProduct.category = category;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.countInStock = countInStock;

    const updatedProduct = await existingProduct.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const existingProduct = await findById(req.params.id);

  if (existingProduct) {
    await Product.deleteOne({ _id: existingProduct._id });
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  addProduct,
  getTopProducts,
  addReview,
  updateProduct,
  deleteProduct,
};
