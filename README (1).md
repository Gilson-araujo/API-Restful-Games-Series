# Desafio

## Games

- Explicação do exercício: Que tal controlarmos nossos jogos e as fases
que já conseguimos passar?

| Método |  Descrição|
| --------- | ----------- |
| `GET` | /games - Retorna todos os jogos |
| `GET` | /games/:id - Retornar apenas um jogo específico |
| `POST` | /games - Cadastrar novo jogo |
| `PUT` | /games/:id - Atualizar um jogo específico |
| `DELETE` | /games/:id - Deletar um jogo específico |
| `PATCH` | /games/:id/liked - Atualizar se gostou ou não do jogo. |

## Series

- Nessa api queremos poder cadastrar séries, cada uma com inúmeras temporadas e cada
temporada com uma lista deepisódios.

| Método |  Descrição|
| --------- | ----------- |
| `GET` | /series - Retorna todas series|
| `GET` | /series/genero - Retornar series de um genero específico|
| `GET` | /series/:id - Retornar apenas uma série específico |
| `POST` | /series - Cadastrar nova série |
| `DELETE` | /series/:id - Deletar uma série específica |
| `PATCH` | /series/:id/liked - Atualizar se gostou ou não da série.
