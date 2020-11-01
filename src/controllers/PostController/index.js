import fs from 'fs'
import path from 'path'
import data from '../../data/data.json'
import uniqid from 'uniqid'

const filePath = path.resolve(__dirname, '../../data/data.json')

class PostController {
  static getGameView = (req, res) => {
    res.render('posts/game')
  }

  static getHomePageView  = (req, res) => {
    res.render('posts/homePage')
  }

  static getCompChoice = (req, res) => {
    let compChoice = ''
    const choice = Math.random();
    if (choice <= 1 / 3) compChoice = 'rock';
    if (choice > 1 / 3 && choice <= 2 / 3) compChoice = 'paper';
    if (choice > 2 / 3) compChoice = 'scissor';

    res.send(compChoice)
  }

  static get = (req, res) => {
    let filteredData = data

    return res.status(200).json({ data: filteredData })
  }

  static create = (req, res) => {
    if(req.body.playerChoice == null && req.body.compChoice == null && req.body.result == null) {
      return res.status(401).send({ error: true, message: 'Field missing in request body.' })
    }

    const { playerChoice, computerChoice, result } = req.body
    const historyData = {
      id: uniqid(),
      playerChoice,
      computerChoice,
      result
    }

    data.push(historyData)

    return fs.writeFile(
      filePath,
      JSON.stringify(data),
      'utf-8',
      () => res.status(201).json({ message: `Successfully saved on ${filePath}` }),
    )
  }

  static delete = (req, res) => {
    const { id } = req.params
    const post = data.find((obj) => obj.id)

    if (!post) {
      return res.status(404).json({ message: '404! Id is not exist.' })
    }

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id == id) {
        data.splice(i, 1)
      }
    }

    return fs.writeFile(
      filePath,
      JSON.stringify(data),
      'utf-8',
      () => res.status(200).json({ message: `Successfully delete data with id:${id} on ${filePath}` }),
    )
  }
}

export default PostController
