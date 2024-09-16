const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/', playerRoutes);
app.use('/api/v1/', teamRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // sequelize.sync({ force: true }).then(() => {
  //   console.log('Database & tables created!');
  // });
});
