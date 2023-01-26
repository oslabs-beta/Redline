<!-- <img src='https://i.imgur.com/nM3Clgr.png' alt='logo'> -->

# Redline Documentation

_Website and Dev-tool: [Redline](https://redlinemetrics.com)_

## Overview

Redline is an open-source tool that displays vital metrics for Redis instances. Redline is easy to set up, free to use, and alerts developers to performance issues, so that they can avoid constantly monitoring their applications Redis instances. Redline monitors:

- Used memory
- Key space hits and misses
- Instantaneous ops per second
- Commands processed
- Connected clients
- Evicted and expired keys
- _and many more_

## Core Features

- Customizable Metrics: Customize which metrics you want to have displayed in real-time.
- Alerts: Set up alerts for individual metrics to be notified when a metric dips below or exceeds a specified value.
- Login: Use your Google or Github login to quickly and securely access Redline and save your Redis instances.
- Easy Set Up: Simply enter your Redis instance host, port, and password, give it a nickname, and click to connect.
- Free: Redline removes a financial barrier to entry, making it accessible to all developers. 

## Getting Started

### How do you use Redline for applications in production?

Navigate to [Redline](https://redlinemetrics.com) and set up a user account or click straight through to our monitoring tool. _Users who opt to sign up using Auth0 are able to save their Redis instances_.

<img width='600' height='auto' src='https://i.imgur.com/ECMcTXz.gif' alt='getting started'>

Go to your Redis cloud console and copy your host, port and password from your configuration settings. _Your port can be found after the colon in your endpoint_.

<img width='600' height='auto' src= 'https://i.imgur.com/WQn5OcQ.png' alt='redis instance'>

Add your Redis instance’s host, port, and password in the sidebar, and give it a unique nickname before you add it to your collection. Click on the nickname to display your metrics.

<img width='600' height='auto' src='https://i.imgur.com/HbAjVsS.gif' alt='sidebar'>

Redline will spin up the graphs for the performance metrics associated with the selected cache, and you can interact with our dynamic graphs to choose which metrics you would like to monitor.

Click the alert icon at the bottom of the chart you’d like to monitor, and enter the threshold value that will trigger the alert.

<img width='600' height='auto' src='https://i.imgur.com/ti69qJ0.gif' alt='alert gif'>

## How do you use Redline for applications in development?

There are two ways to use the application for development purposes. The first method:

First, clone the repository from Github .
Run docker build -t redline . in your terminal
Run docker run -p [open port ex 3000]:3000 redline in your terminal
Navigate to localhost:[port]. You should see the web application and enter your host, port, password (default is empty) and nickname.
Or, simply pull the image from Docker:

Navigate to Docker Hub and pull the image using the command docker pull sakurakiyama/redline
Run docker run -p [open port ex 3000]:3000 sakurakiyama/redline in your terminal
Navigate to localhost:[port]. You should see the web application and enter your host, port, password (default is empty) and nickname.
If you’re having any trouble connecting your Redis instance, please refer to the images above for reference.

## Tech Stack

Next.js | Typescript | React.js | PostgreSQL | Auth0 | Chart.js | SASS/CSS | Jest | Docker

### How to Contribute

1. Clone the repo and make a new branch
2. Run ```docker build -t redline .``` in your terminal
3. Run ```docker run -dp 3000:3000 redline``` in your terminal
4. Add a feature, fix a big or refactor some code
5. Write/update tests for the changes you made, if necessary
6. Run unit tests and make sure all tests pass: npm test
7. Open a Pull Request with a comprehensive description of changes to the dev branch
8. Open a Pull Request to the docs and Contributors if necessary


## Contributors

**Sakura Akiyama** [Github](https://github.com/sakurakiyama) | [LinkedIn](https://www.linkedin.com/in/sakura-akiyama-bowden/)

**Luke Driscoll** [Github](https://github.com/LukeDriscoll4) | [LinkedIn](https://www.linkedin.com/in/luke-driscoll/)

**Alan Perng** [Github](https://github.com/aperng31) | [LinkedIn](https://www.linkedin.com/in/alanperng/)

**Elvin Yuen** [Github](https://github.com/elvinyuen) | [LinkedIn](https://www.linkedin.com/in/elvinyuen/)
