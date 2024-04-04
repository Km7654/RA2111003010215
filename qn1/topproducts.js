const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

const topproducts = async (req, res) => {
  try {
    const { categoryName, companyname } = req.params;
    const { top, minPrice, maxPrice, sortBy, sortOrder, page } = req.query;
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    if (!top || !minPrice || !maxPrice) {
        return res.status(400).json({
          message: "top, minPrice, and maxPrice are required in query parameters",
          timestamp: new Date().toISOString(),
          status: 400,
        });
      }
    if (!categoryName || !companyname || !companies.includes(companyname)) {
      return res.status(400).json({
        message: "Invalid Category or Company Name",
        timestamp: new Date().toISOString(),
        status: 400,
      });
    }
    
    let URL = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryName}/products`;
    URL += `?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    if (sortBy) URL += `&sortBy=${sortBy}`;
    if (sortOrder) URL += `&sortOrder=${sortOrder}`;
    if (page) URL += `&page=${page}`;
    const AccessRequest = await axios.post("http://20.244.56.144/test/auth", {
      "companyName": "goMart",
      "clientID": "8a694f73-3c06-40e0-b1ec-ce2b2ec718c5",
      "clientSecret": "GeruIClGRjMurgWh",
      "ownerName": "Kaushik Singh",
      "ownerEmail": "km7654@srmist.edu.in",
      "rollNo": "RA2111003010215"
  });
    var ACCESS = AccessRequest.data.access_token;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${ACCESS}`,
      },
    });

    const productsWithIds = response.data.map(product => ({
      ...product,
      id: uuidv4() 
    }));
    res.status(200).json({
      URL: URL,
      message: "Success",
      timestamp: new Date().toISOString(),
      status: 200,
      data: productsWithIds,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      timestamp: new Date().toISOString(),
      status: 500,
    });
  }
};

module.exports = topproducts;
