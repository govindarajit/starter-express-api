const express = require('express')
const app = express() 
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const postsRoutes = require('./routes/api/posts_controller');

//BodyParser Middleware 
app.use(express.json());

//connect to mongo
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));
app.use('/', postsRoutes);
// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })
app.listen(process.env.PORT || 3000)
