# Pokémon Team Manager Frontend

This project is the frontend for the Pokémon Team Manager application, built using **React.js**. The frontend allows users to create and manage Pokémon teams, view lists of teams, and edit team details.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Features](#features)
- [Components](#components)
  - [Home](#home)
  - [CreateTeam](#createteam)
  - [EditTeam](#editteam)
  - [ListTeams](#listteams)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Validation](#validation)

## Project Structure

The project is organized into several main directories:

- `src`: Contains the main application code.
  - `components`: Reusable React components.
  - `pages`: Main pages of the application.
  - `api`: API integration functions.
  - `assets`: Static assets like images and stylesheets.
  - `helpers`: Utility functions and helpers.

## Setup and Installation

To set up and run the project locally, follow these steps:

1. Go in the project folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```

## Features
- Home Page: Introduction to the application with navigation options.
- Create Team Page: Form to create a new team and add random Pokémon to the team.
- Edit Team Page: Edit the team's name and manage Pokémon within the team.
- List Teams Page: View all created teams, filter by Pokémon types, and navigate to team details.



## Components
### Home
The Home component serves as the landing page. It provides navigation to the Create Team and List Teams pages. The page is styled to resemble a Pokémon-themed interface with a background image and interactive cards.

### CreateTeam
The CreateTeam component allows users to create a new team by entering a team name and adding random Pokémon. The page includes:

- A form to input the team name.
- A button to fetch a random Pokémon from the PokéAPI and add it to the team.
- Display of the added Pokémon with their details (name, base experience, sprite, abilities, and types).
- The layout is such that the Pokémon list appears to the right of the form.

### EditTeam

The EditTeam component lets users edit an existing team's name and manage its Pokémon. Features include:

- Display of the current team name with an option to edit it.
Button to add random Pokémon to the team.
- Display of Pokémon in the team, with the latest added Pokémon expanded by default and previous ones shown in a collapsed state.
- Pokémon details are displayed in a card format, with an option to expand/collapse the cards.

### ListTeams
The ListTeams component lists all the teams created. It includes:

- A filter option to view teams containing Pokémon of specific types.
- Sorting options to display teams based on creation date.
- Each team card displays the team name, images of all Pokémon, total base experience, and a list of Pokémon types.
- Clicking on a team card navigates to the Edit Team page for that team.


## API Integration
The application interacts with the backend and the PokéAPI to fetch and manage data. The API functions are defined in src/api.js:

- createTeam: Creates a new team.
- getTeams: Retrieves all teams.
- getTeamById: Retrieves details of a specific team by ID.
- updateTeam: Updates the name of a team.
- addPokemonsToTeam: Adds a Pokémon to a specific team.
- getPokemon: Fetches details of a specific Pokémon from the PokéAPI.

## Styling
Styling is achieved using CSS with a focus on a Pokémon-themed appearance:

- Home: Styled with a Pokémon tournament image and interactive cards that resemble Poké Balls.
- CreateTeam: Features a form with custom styling and Pokémon cards that adjust layout dynamically.
- EditTeam: Includes styling for input fields, buttons, and Pokémon cards with expand/collapse functionality.
- ListTeams: Styled to display team cards with Pokémon images and additional details.

## Validation
Form validation is implemented using Joi for schema validation on the backend. The frontend forms include basic validation to ensure required fields are filled before submission.

