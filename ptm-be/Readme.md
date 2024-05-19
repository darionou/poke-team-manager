# Pokémon Team Manager Backend

This project implements the backend for a Pokémon Team Manager application. The backend is built with Node.js, TypeScript, Express, and PostgreSQL, using Docker for containerization. 

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Database Schema](#database-schema)
- [Services](#services)
- [Validation](#validation)
- [Testing](#testing)

## Features

- Create, update, and retrieve Pokémon teams.
- Add Pokémon to teams.
- Retrieve details of a specific team along with its Pokémons.
- Filter teams based on Pokémon types.

## Technologies

- Node.js
- TypeScript
- Express
- PostgreSQL
- Docker
- Docker Compose
- Jest (for testing)


## Project Structure and Configuration

The project uses the `src` folder as the main development directory. The project follows the common schema of service, controller, and repository to manage the business logic, request handling, and database interactions.

### Project Structure

- **Controllers**: Responsible for handling incoming requests. Each entity has its specific controller.
- **Services**: Contain the business logic for each entity. For example, there are separate services for Pokémon and teams.
- **Repositories**: Handle direct interactions with the database.
- **Mapper**: Used to parse requests and responses for security reasons and data consistency.

### Database Design and Entity Relationships
I designed the database using PostgreSQL to manage the entities of teams and Pokémon.   
I created two main tables: team and team_pokemon. The team table contains information about the teams, such as their name and creation date.   
The team_pokemon table contains information about the Pokémon, such as name, base experience, sprite, abilities, and types. Each record in the team_pokemon table includes a team_id field that represents a foreign key referring to the team ID in the team table.  
 This establishes a one-to-many relationship between teams and Pokémon, where one team can have multiple Pokémons. Primary keys and foreign keys ensure data referential integrity. I also included a external_id field in the pokemon table to store the Pokémon ID obtained from the PokéAPI.

### Caching team list response
I implemented in-memory caching using the node-cache package to store and retrieve the filtered list of teams. 

The cache is checked before querying the database, and if data is not found, the query result is stored in the cache for future requests. 

### Database Configuration

You can find the database configuration in the `docker-compose.yml` file.

To configure the connection to the database, create a new `.env` file in the project root. You can use the credentials provided in the `.env.example` file as a template. Simply copy and paste the contents of .env.example into your new .env file and adjust the values as needed.

All SQL scripts that run on database startup are located in the `/db` folder.



## Setup

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. Build and execute the application using Docker Compose:
    ```bash 
        docker-compose up --build
    ```
2. Access to the APIs:
    - It will start the project and serve the API over the port `4000`. You can then start querying the API.


## Database Schema
Entities: 
- team
    - id: Serial Primary Key
    - name: String
    - created_at: Timestamp
- team_pokemon
    - team_id: Foreign Key to Team
    - id: Serial Primary Key
    - name: String
    - base_experience: Integer
    - sprite: String
    - abilities: String
    - types: String
    - external_id: Integer (ID from PokéAPI)
    - created_at: Timestamp

## Services
These are few services I implemented to complete the task:
- **getTeams()**: Get all teams.
- **createTeam(body: TeamRequest)**: Create a new team.
- **getTeamWithPokemons(teamId: number)**: Get a team with all his pokemons.
- **updateTeam(teamId: number, body: TeamRequest)**: Update team details.
- **getTeamsPokemonsFiltered(filters: FilterTeamRequest)**: Get teams filtered with all their pokemons.

## Validation 

### Team Validation
For the validation I used Joi, you can find all schemas in the `\validations` folder

## Testing
All tests are written using Jest and you can find them in the folder `\test`.

I developed few unit tests for testing all teams services I implemented.

To execute tests

```sh
    npm run test
```