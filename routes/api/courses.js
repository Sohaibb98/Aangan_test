const {Router} = require('express')
const Course = require('../../models/Course')


const router = Router()

router.get('/', async(req, res) => {
    try{
        const courses = await Course.find()
        if (!courses) throw new Error('No Course Items!')
        const sorted = courses.sort((a,b ) => {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
    const newCourse = new Course(req.body)
    try{
        // if (newCourse.hasOwnProperty("students")==false)
        //     {newCourse['students']=[]}
        const course = await newCourse.save()
        if (!course) throw new Error('Something went wrong saving the Course item')
        res.status(200).json(course)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params

    try{
        const response = await Course.findByIdAndUpdate(id, req.body)
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
        const removed = await Course.findByIdAndDelete(id)
        if (!removed) throw Error("Something went wrong while deleting")
        res.status(200).json(removed)
    } catch(error) {
        res.status(500).json({message: error.message })
    }
})

module.exports = router