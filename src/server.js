const app = require('./app');
const config = require('./config/config');

app.listen(config.port, () => {
  console.info(`Email template generator listening on port ${config.port}`);
});
