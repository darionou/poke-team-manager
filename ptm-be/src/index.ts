import express from 'express';
import bodyParser from 'body-parser';
import teamRoutes from './routes/team';
import pokemonRoutes from './routes/pokemon';

const app = express();
app.use(bodyParser.json());

app.use('/teams', teamRoutes);
app.use('/pokemons', pokemonRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
