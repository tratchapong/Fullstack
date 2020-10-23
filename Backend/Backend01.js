const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

app.use(cors())
app.use(express.json())

let data = JSON.parse(fs.readFileSync('./songs.json'))
let {songs} = data
console.log(songs)

app.get('/songs', (req, res) => {
  res.status(200).send(data.songs)
})

// app.get('/songs/:id', (req, res) => {
//   output = songs.find( x=> x.id === +req.params.id)
//   res.status(200).send(output)
// })

app.delete('/songsReset', (req, res) => {
  songs = []
  let wdata = { songs }
  res.status(200).send('Reset all data')
  fs.writeFileSync('./songs.json',JSON.stringify(wdata))
})

app.post('/songs/:name', (req, res) => {
  let new_id = songs.length>0 ? songs[songs.length-1].id + 1 : 1
  let new_song = {id: new_id, name: req.params.name}
  songs.push(new_song)
  res.status(201).send(new_song)
  let wdata = { songs }
  fs.writeFileSync('./songs.json',JSON.stringify(wdata))
})

app.listen(5000, ()=> console.log("Server start..."))
