import { app, PORT } from './server';

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
