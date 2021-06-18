const {Router} = require('express')
const Student = require('../../models/Students')


const router = Router()

router.get('/', async(req, res) => {
    try{
        const students = await Student.find()
        if (!students) throw new Error('No Students!')
        const sorted = students.sort((a,b ) => {
            var nameA = a.roll.toUpperCase();
            var nameB = b.roll.toUpperCase(); 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
        })

        res.status(200).json(sorted)

    } catch(error){
        res.status(500).json({message: error.message})
    }
    
})

router.post('/', async (req,res) => {
    const newStudent = new Student(req.body)
    try{
        const student = await newStudent.save()
        if (!student) throw new Error('Something went wrong saving the Student item')
        res.status(200).json(student)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params

    try{
        const response = await Student.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong while updating')
        const updated = { ... response._doc, ...req.body }
        res.status(200).json(updated)
    } catch(error) {
        res.status(500).json({message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const removed = await Student.findByIdAndDelete(id)
        if (!removed) throw Error("Something went wrong while deleting")
        res.status(200).json(removed)
    } catch(error) {
        res.status(500).json({message: error.message })
    }
})

module.exports = router