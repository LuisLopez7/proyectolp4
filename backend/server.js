require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const estadisticasRoutes = require('./routes/Estadisticas');
const profileRoutes = require('./routes/profile');

const app = express();

// Verificar variables de entorno
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

// Middleware
app.use(cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('MongoDB connection error:', error);
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/Estadisticas', estadisticasRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
