const Class = require("../../models/class.model")
const Subject = require("../../models/subjects.model")
const Student = require("../../models/student.model")

const classTransform = async( classDoc ) => {
    return {
        ...classDoc._doc,
        _id: classDoc._id,
        subjects: getSubject.bind(this, classDoc.subjects),
        students: getStudent.bind(this, classDoc.students)
    }
}

const getSubject = async(subjectId) => {
    // console.log("ddd")
    const subjects = await Subject.find({_id : {$in: subjectId }})
    // console.log("ggg",subjects)
    return subjects
}

const getStudent = async(studentId) => {
    const student = await Student.find({_id: {$in: studentId}})
    console.log(student)
    return student
}



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
    }


}



module.exports = classResolver

