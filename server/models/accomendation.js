const mongoose=require('mongoose')

const accomendationSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    title:{
        type:String
    },
    address:{
        type:String
    },
    addedPhotos:{
        type:[String]
    },
    description:{
        type:String
    },
    selectedPerks:{
        type:[String]
    },
    extraInfo:{
        type:String
    },
    checkIn:{
        type:Number
    },
    checkOut:{
        type:Number
    },
    maxPeople:{
        type:Number
    },
    price:{
        type:Number
    }
})

const AccomendationModel=mongoose.model('Accomendation',accomendationSchema)

module.exports=AccomendationModel