const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://backend-dates-service/dates');
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener datos del backend:', error);
        res.status(500).json({ error: 'Error al obtener datos del backend' });
    }
});

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});