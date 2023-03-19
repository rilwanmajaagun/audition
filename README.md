# audition

A NodeJs server which allows start up create several phases for tasks. Every phases can have an unlimited  tasks and each task status can be update
when the task is completed. When all the task in the phase is completed, the phase is marked as done and the next phase is unlocked.



---

## Getting Started

To get a copy of this project up and running on your local machine for testing and development, you would need to have a minimum of the listed prerequisites installed on your local machine.

## Prerequisites

1. Node.js (v14 or higher) and npm (6.4.1 or higher) installed on your local machine. Run node -v and npm -v in your terminal to confirm that you have them installed

2. GIT and Bash

### Node
- #### Node installation on Windows

Go to [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might might be dependent on it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, by running the following command.

      $ sudo apt install nodejs
      $ sudo apt install npm

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14

    $ npm --version
    6.9.0

To update your `npm`, run the following command.

    $ npm install npm -g

---

## Project Install

    $ git clone https://github.com/rilwanmajaagun/audition.git
    $ cd audition
    $ npm install


## Running the project

    $ npm run dev (development)
    $ npm start (production)
## Running tests

    $ npm run test

## Technologies

- Node JS
- Typescript
- Express
- Postgres
- Supertest and jest
- Postman

## API
The API is currently in version 1 (v1) and it is hosted on heroku at [Base URL](http://localhost:8000/api/v1/)

## DATABASE SCHEMA DESIGN
- dbdiagram: https://dbdiagram.io/d/623605b6bed6183873c2f993
## API Documentation
- postman: https://documenter.getpostman.com/view/11075743/UVsQrNwr

## Copyright

Copyright (c) 2021 Majaagun Rilwan


```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

