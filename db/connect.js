const mongoose = require('mongoose')

const connectDb = async (url) => {
    await mongoose.connect(url)
    .then(res => {
        if(process.env.MODE === "production"){
            console.log(`cloud mongodb connected`)
        } else if (process.env.MODE === "development"){
            console.log(`local mongodb connected`)
        }
    }).catch(err => console.log(err))
}
module.exports = connectDb