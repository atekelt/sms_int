const app = require('./api');

const PORT = process.env.SRV_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});