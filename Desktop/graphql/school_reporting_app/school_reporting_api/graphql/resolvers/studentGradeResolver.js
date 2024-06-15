const StudentsGrades = require("../../models/studentGrades.model")

const studentGradesResolver = {
    createStudentGrades: async({studentGradeInput}, context) => {
        if(context.isAuth === undefined) {
            throw new Error("user is not authenticated")
        }

            const subject = studentGradeInput.subjects.map(subject => {
                return({
                    subjectName: subject.subjectName,
                    assignments: subject.assignments || 0,
                    classWork: subject.classWork || 0,
                    test: subject.test || 0,
                    exam: subject.exam || 0,
                    totalScore: (subject.assignments || 0) + (subject.classWork || 0) + (subject.test || 0) + (subject.exam || 0)
                })
            })

        try{
            const studentGrades = new StudentsGrades({
                studentName: studentGradeInput.studentName,
                className: studentGradeInput.className,
                subjects: subject
            })
            console.log(studentGrades)
            studentGrades.save()
            return studentGrades
        }catch(error){
            console.log(error)
            throw new Error("failed to create studentGrades")
        }
    },

    getStudentGrades: async(args, context) => {
        if(!context.isAuth) {
            throw new Error("user is unauthorized")
        }
        try{
            const studentGrades = await StudentsGrades.find()
            console.log(studentGrades)
            return studentGrades
        }catch(error){
            console.log(error)
            throw new Error("failed to retrieve studentgrades")
        }
    },

    getStudentGradeById: async({_id}, context) => {
        if(!context.isAuth) {
            throw new Error("user is unauthenticated")
        }
        try{
            const studentGrade = await StudentsGrades.findById(_id)
            return studentGrade
        }catch(error){
            console.log(error)
            throw new Error("failed to fetch student grades with id: ", _id)
        }
    },

    updateStudentGrades: async({_id, studentGradeInput}, context) => {
        if(!context.isAuth){
            throw new Error("user is not authenticated")
        }

        try{
              const student = await StudentsGrades.findById(_id)

              if(!student){
                throw new Error("student not found")
              }

              const updateField = {}
            //   const subject = studentGradeInput.subjects ? studentGradeInput.subjects.map((subject, index) => ({
            //     subjectName: subject.subjectName !== undefined ? subject.subjectName: (student.subjects[index]?.subjectName) || 0,
            //     assignments: subject.assignments !== undefined ? subject.assignments: (student.subjects[index]?.assignments) || 0,
            //     classWork: subject.classWork !== undefined ? subject.classWork: (student.subjects[index]?.classWork) || 0,
            //     test: subject.test !== undefined ? subject.test: (student.subjects[index]?.test) || 0,
            //     exam: subject.exam !== undefined ? subject.exam : (student.subjects[index]?.exam) || 0,
            //     totalScore: subject.totalScore !== undefined ? (
            //         (!subject.assignments ? subject.assignments : student.subjects[index].assignments) + 
            //         (!subject.classWork ? subject.classWork : student.subjects[index].classWork) + 
            //         (!subject.test ? subject.test : student.subjects[index].test) + 
            //         (!subject.test ? subject.exam : student.subjects[index].exam)) 
            //         : (student.subjects[index].totalScore)
            //   })): student.subjects

            const subject = studentGradeInput.subjects ? studentGradeInput.subjects.map((subject, index) => {
                const existingSubject = student.subjects[index] || {};
                const assignments = subject.assignments !== undefined ? subject.assignments : existingSubject.assignments || 0;
                const classWork = subject.classWork !== undefined ? subject.classWork : existingSubject.classWork || 0;
                const test = subject.test !== undefined ? subject.test : existingSubject.test || 0;
                const exam = subject.exam !== undefined ? subject.exam : existingSubject.exam || 0;
    
                return {
                    subjectName: subject.subjectName !== undefined ? subject.subjectName : existingSubject.subjectName || '',
                    assignments: assignments,
                    classWork: classWork,
                    test: test,
                    exam: exam,
                    totalScore: assignments + classWork + test + exam
                };
            }) : student.subjects;

              Object.keys(studentGradeInput).forEach(key => {
                if((key === "subjects") && studentGradeInput[key] !== undefined){
                    updateField[key] = subject
                } else if(subjectInput[key] !== undefined) {
                    updateField[key] = subjectInput[key]
                }
              })

              const updateStudentGrades = await StudentsGrades.findByIdAndUpdate(_id, 
                {$set: updateField},
                {new: true} 
                )

                console.log(updateStudentGrades)
                return updateStudentGrades;

        }catch(error){
            console.log(error)
            throw new Error("failed to updated student")
        }
    }
}
module.exports = studentGradesResolver