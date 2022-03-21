const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repository = repositories.find((f) => f.id === id)

  if(!repository) {
    return response.status(404).json({ ok: false })
  }

  repository.title = title
  repository.url = url
  repository.techs = techs

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((f) => f.id === id)

  if(!repository) {
    return response.status(404).json({ ok: false })
  }

  repositories.splice(repositories.indexOf(repository), 1);

  return response.status(204).json({ ok: true });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((f) => f.id === id)

  if(!repository) {
    return response.status(404).json({ ok: false })
  }

  repository.likes++

  return response.json(repository)
});

module.exports = app;
