const {Schema, model} =require('mongoose')

const CourseSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    students:{
        type:Schema.Types.Array
    }
})

const Course = model('course', CourseSchema)

module.exports = Course