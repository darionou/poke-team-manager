CREATE TABLE teams if not exists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE pokemons if not exists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  base_experience INT NOT NULL,
  sprite VARCHAR(255) NOT NULL,
  abilities VARCHAR(255) NOT NULL,
  types VARCHAR(255) NOT NULL,
  team_id INT REFERENCES teams(id) ON DELETE SET NULL -- Add this line
);





