import dotenv from 'dotenv';
import App from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
new App().server.listen(PORT, () => console.log(`Running on ${PORT}`));
