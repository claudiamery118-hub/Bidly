**BIDLY**

Bidly is a recruitment matching platform that models the sorority bid day process using the Gale–Shapley stable matching algorithm. I built this project to connect algorithmic concepts with a real-world system I’ve experienced firsthand through recruitment.

Overview

This application simulates how potential new members (PNMs) and chapters are matched based on ranked preferences. The goal is to produce stable, optimal matches where no pair would prefer each other over their assigned match.

Rather than just implementing the algorithm on its own, I focused on building an interactive platform around it with a clean and intuitive user experience.

## Features

- Multi-role dashboards:
  - PNM dashboard for ranking chapters  
  - Recruiter dashboard for managing chapter preferences  
  - Panhellenic/Admin dashboard for running the matching process  

- Implementation of the Gale–Shapley stable matching algorithm  
- Preference ranking system for both PNMs and chapters  
- Real-time match generation and bid results  
- Modular, reusable React component structure  

## Tech Stack

- React  
- JavaScript  
- HTML/CSS  

## How It Works

1. PNMs and chapters submit ranked preferences  
2. The Gale–Shapley algorithm processes both sets of rankings  
3. The system outputs stable matches that reflect real recruitment outcomes  

This ensures:
- Stable matches  
- Fair and optimized pairing  
- No mutually preferred alternative matches  

## Why I Built This

As someone involved in sorority recruitment, I’ve seen how structured and data-driven the matching process is behind the scenes. I wanted to recreate that system in a way that demonstrates both my technical skills and my ability to apply algorithms to real-world problems.

## Future Improvements

- Backend integration for persistent data  
- User authentication and role-based access  
- Enhanced UI/UX and data visualization  
- Deployment for live usage  

## Running the Project

```bash
npm install
npm start
