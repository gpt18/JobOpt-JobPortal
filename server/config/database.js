const  mongoose = require('mongoose')

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology : true
    }).then(()=>console.log("Database Connected!"))
    .catch((error)=>{ 
        console.log("this error occured"+ error)
        process.exit(1)
    })
}


exports.connectToMongoDB = (url) => {
    return mongoose.connect(url);
}
