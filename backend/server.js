const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/routes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});