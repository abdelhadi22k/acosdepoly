import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    categoryProduct: {
      categoryValue: { type: String, required: true },
      categoryImg: { type: String, required: true },
    },
    offer: { 
      offerAvailable: { type: Boolean, required: true },
      offerDescription: { type: String, required: true },
    },
    discount: { 
      discountAvailable: { type: Boolean, required: true },
      discountValue: { type: Number, required: true },
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
