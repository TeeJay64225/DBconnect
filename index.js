import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import clientRoute from "./routes/client.route.js";
import invoiceRoute from "./routes/invoice.route.js"; // Import invoice routes
import invoiceItemRoute from "./routes/invoiceItem.route.js"; // Adjust the path if necessary
import receiptRoute from "./routes/receipt.route.js"; // Adjust the path if necessary
import receiptItemRoute from "./routes/receiptItem.route.js"; // Adjust the path if necessary
import productRoute from "./routes/product.route.js"; // Adjust the path if necessary

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoute); // Ensure this is correctly included
app.use("/api/clients", clientRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/invoiceitems", invoiceItemRoute);
app.use("/api/receipts", receiptRoute);
app.use("/api/receipt-items", receiptItemRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
	.connect(MONGOURL)
	.then(() => {
		console.log("Database is connected successfully.");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => console.log(error));
