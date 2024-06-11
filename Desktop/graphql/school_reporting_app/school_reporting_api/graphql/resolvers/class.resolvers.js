const Class = require("../../models/class.model")
const {classTransform, getSubject} = require("../../helpers/resolverHelpers")

// const classTransform = async( classDoc ) => {
//     return {
//         ...classDoc._doc,
//         _id: classDoc._id,
//         subjects: getSubject.bind(this, classDoc.subjects),
//         students: getStudent.bind(this, classDoc.students)
//     }
// }

// const getSubject = async(subjectId) => {
//     // console.log("ddd")
//     const subjects = await Subject.find({_id : {$in: subjectId }})
//     // console.log("ggg",subjects)
//     return subjects
// }

// const getStudent = async(studentId) => {
//     const student = await Student.find({_id: {$in: studentId}})
//     console.log(student)
//     return student
// }


const classResolver = {
    createClass: async({ClassInput}) => {
        try{
            const newClass = new Class({
            className: ClassInput.className,
            numberOfStudents: ClassInput.numberOfStudents,
            classTeacher: ClassInput.classTeacher,
            classCaptain: ClassInput.classCaptain,
        })

        const _class = await newClass.save()
        return _class
    }catch(error){
        console.log(error)
        throw new Error("failed to create new class")
    }
    },

    getClasses: async() => {
        try{
            const classes  = await Class.find()
            console.log(classes)
            const result = await classes.map((classDoc) =>  classTransform(classDoc))
            console.log("result", result)
            return result
        }catch(error){
            console.log(error)
            throw new Error("class not found")
        }
    },

    updateClass: async({_id, classInput}) => {
        try{
            const updateField = {}
            const _class = await Class.findById(_id)

            // if(classInput.className !== undefined) {
            //     updateField.className = classInput.className || _class.className
            // }
            // if(classInput.numberOfStudents !== undefined ) {
            //     updateField.numberOfStudents = classInput.numberOfStudents || _class.numberOfStudents
            // }
            // if(classInput.classTeacher !== undefined) {
            //     updateField.classTeacher = classInput.classTeacher || _class.classTeacher
            // }
            // if(classInput.classCaptain !== undefined) {
            //     updateField.classCaptain = classInput.classCaptain || _class.classCaptain
            // }

            Object.keys(classInput).forEach(key => {
                if(classInput[key] !== undefined) {
                    updateField[key] = classInput[key] || _class[key]
                }
            })

            const updateClass = await Class.findByIdAndUpdate(_id, 
                {$set: updateField},
                {new: true}
                )
            return updateClass

        }catch(error){
            console.log(error)
        }
    },

    deleteClass: async(_id) => {
        try{
            const _class = await Class.findByIdAndDelete(_id)
            return _class
        }catch(error){
            console.log(error)
        }
    }

}



module.exports = classResolver

