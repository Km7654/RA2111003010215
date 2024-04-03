const express = require("express");
const axios = require("axios");
const topProducts = require("../qn1/topproducts");
const byProductID = require("../qn1/byProductid");

const router = express.Router();
router.get(
    '/categories/:categoryname/products/:productid',
    byProductID
)
router.get(
  "/companies/:companyname/categories/:categoryName/products",
  topProducts 
);


module.exports = router;