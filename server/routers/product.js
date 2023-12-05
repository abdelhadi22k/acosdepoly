import express from "express";
import Product from "../model/product.js";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

const PAGE_SIZE = 3;

router.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

router.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

router.get(
  "/categoryProducts",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("categoryProduct");
    res.send(categories);
  })
);


router.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

router.get(`/Productsbycategory/:categoryValue`, async (req, res) => {
  try {
    const products = await Product.find({ 'categoryProduct.categoryValue': req.params.categoryValue });
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Products Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/offer", async (req, res) => {
  try {
    const products = await Product.find({ "offer.offerAvailable": true });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/discount", async (req, res) => {
  try {
    const products = await Product.find({ "discount.discountAvailable": true });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

router.post("/addProduct", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    slug: req.body.slug,
    image: req.body.image,
    brand: req.body.brand,
    categoryProduct: req.body.categoryProduct,
    offer: req.body.offer,
    discount: req.body.discount,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      brand: req.body.brand,
      categoryProduct: req.body.categoryProduct,
      offer: req.body.offer,
      discount: req.body.discount,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    },
    { new: true }
  );
  if (!product) {
    return res.status(404).send(`we dont have her this Product`);
  }
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) {
    return res.status(404).send(`we dont have her this Product `);
  }
  res.send(product);
});

export default router;
