import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import teamRoutes from './routes/team';
import pokemonRoutes from './routes/pokemon';

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/teams', teamRoutes);
app.use('/pokemons', pokemonRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
