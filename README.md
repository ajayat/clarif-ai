<h1 align="center">ClarifAI</h1>
<h2 align="center">High-Tech Entrepreneurship</h2>
<h4 align="center">Adrien JAYAT, Lou-Anne HARRAU, Yani HUART, Vassily BERARD, Enzo DONATI, Marta LLULL</h4>

![Python3.11](https://img.shields.io/badge/python-3.11-red) &nbsp;

## Overview

TO BE COMPLETED

## Easy Setup with Docker

Docker can be used to run the backend, the frontend, and the database in isolated containers. You need to install [Docker](https://docs.docker.com/get-docker/) on your system.

Then start the Docker containers with the following command:

```bash
docker compose up
```

## Dependencies

### Backend
The API is built using [FastAPI](https://fastapi.tiangolo.com/), you need to install [Python 3.11](https://www.python.org/downloads/release/python-31112/) or more.

#### Using Pipenv

Install [Pipenv](https://pipenv.pypa.io/en/latest/) with `pip install pipenv`.

Create an empty `.venv` directory and install dependencies using `Pipenv`:

```bash
mkdir .venv
pipenv install
```

### Frontend

Install [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) (comes with Node.js).

You can start the frontend with the following command:

```bash
npm run start
```