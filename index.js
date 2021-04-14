const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')

require("dotenv").config();
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');

app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'))

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect(
    // 'mongodb+srv://vmd211099:123123@Cluster0.ojsbn.mongodb.net/supplements?retryWrites=true&w=majority',
    process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(3333, () => console.log("Server is running")))
    .catch(error => console.log(error.message));

mongoose.set('useFindAndModify', false);
