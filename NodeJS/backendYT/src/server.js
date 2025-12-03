import 'dotenv/config';
import express from 'express';

import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use(express.json());
app.use("/movies", movieRoutes);

app.get('/', (req,res) => {
   res.json({message: "Hello World"});
})

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});