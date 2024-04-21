const express = require('express');
const routesUsager = require('./src/routes/ListeTacheRoutes');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
var cors = require('cors');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/documentation.json');

const { router } = require('./src/routes/ListeTacheRoutes');

const swaggerOptions ={
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Demo API"
}
app.use(express.json());
app.use('/api/projetFinale', routesUsager);

const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });

app.use(morgan('combined', {
  stream: errorLogStream,
  skip: (req, res) => res.statusCode < 500
}));

app.use(cors());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

const port = 3030;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});