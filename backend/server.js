import app from './src/app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});