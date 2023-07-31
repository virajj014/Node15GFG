const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/about', (req, res) => {
    res.status(200).send('About Page')
})


app.get('*', (req, res) => {
    res.status(404).send('404 not found')
})
// app.use((req, res, next) => {
//     res.status(404).send(
//         "<h1>Page not found on the server</h1>")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})