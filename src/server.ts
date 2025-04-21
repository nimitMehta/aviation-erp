import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
