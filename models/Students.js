const {Schema, model} =require('mongoose')

const StudentSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    roll:{
        type: String,
        required: true,
    }
})

const Student = model('student', StudentSchema)

module.exports = Student