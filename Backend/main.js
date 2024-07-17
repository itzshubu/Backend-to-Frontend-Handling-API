import express from "express";
import cors from "cors"
const app = express();
const PORT = 3000;

// Use the CORS middleware
app.use(cors());

// Specific Origins: If you want to restrict which domains can access your server, specify the origin property in corsOptions.
// const corsOptions = {
//     origin: 'http://localhost:5173', // Replace with your specific origin
//     optionsSuccessStatus: 200 // Some legacy browsers choke on 204
//   };

const categories = ["Wood", "Plastic", "Metal", "Glass", "Ceramic"];
const productNames = {
    Wood: [
        "Table",
        "Chair",
        "Shelf",
        "Desk",
        "Cabinet",
        "Bench",
        "Bed Frame",
        "Wardrobe",
        "Dresser",
        "Bookshelf",
    ],
    Plastic: [
        "Bottle",
        "Chair",
        "Container",
        "Box",
        "Bucket",
        "Tray",
        "Cup",
        "Spoon",
        "Fork",
        "Plate",
    ],
    Metal: [
        "Hammer",
        "Nails",
        "Pipe",
        "Fence",
        "Wrench",
        "Screwdriver",
        "Bolt",
        "Nut",
        "Plier",
        "Saw",
    ],
    Glass: [
        "Vase",
        "Bottle",
        "Window",
        "Table",
        "Cup",
        "Mirror",
        "Bowl",
        "Jar",
        "Lantern",
        "Candle Holder",
    ],
    Ceramic: [
        "Mug",
        "Plate",
        "Tile",
        "Vase",
        "Bowl",
        "Teapot",
        "Figurine",
        "Lamp",
        "Planter",
        "Coaster",
    ],
};

// Function to generate random products
const generateProducts = () => {
    const products = [];
    let idCounter = 1;

    for (const category of categories) {
        for (const name of productNames[category]) {
            products.push({
                id: idCounter++,
                name: `${name}`,
                price: (Math.random() * 100).toFixed(2),
                category: category,
                description: `This is the description for ${name}`,
                inStock: Math.random() > 0.5,
            });
        }
    }

    return products;
};

const products = generateProducts();

// API endpoint to get all products
app.get("/api/products", (req, res) => {
    // http://localhost:3000/api/products?name=plastic&category=plastic
    // Log the query parameters for debugging
    console.log(req.query);

    // If 'name' query parameter is provided, filter products by name
    let filteredProducts = products;
    if (req.query.name) {
        filteredProducts = filteredProducts.filter((item) =>
            item.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
    }

    // If 'category' query parameter is also provided, filter the already filtered products by category
    if (req.query.category) {
        filteredProducts = filteredProducts.filter((item) =>
            item.category.toLowerCase().includes(req.query.category.toLowerCase())
        );
    }

    // Respond with the filtered list or all products if no query parameters were provided
   setTimeout(()=>{
       res.json(filteredProducts);
   },3000)
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
