const Student = require("../../models/student.model")

const studentResolver = {
    createStudent: async({studentInput}) => {
        try{
            const grades = studentInput.grades ? studentInput.grades.map(grade => ({
                assignments: grade.assignments || 0,
                classWork: grade.classWork || 0,
                test: grade.test || 0,
                exam: grade.exam || 0
            })): []
    
            const totalScore = grades.reduce((sum, grade) => 
            sum + grade.assignments + grade.classWork + grade.test + grade.exam, 0
        );
            const student = new Student({
                firstName: studentInput.firstName,
                lastName: studentInput.lastName,
                age: studentInput.age,
                class: studentInput.class,
                grades: grades,
                score: totalScore
            })
    
            const newStudent = await student.save()
            return newStudent
        }catch(error){
            console.log(error)
            throw new Error("failed to setup new student Data")
        }
        
    },

    createBulkStudents: async({studentInput}) => {
        try{
            

            const students = studentInput.map(student => {

                const grades = student.grades ? student.grades.map(grade => ({
                    assignments: grade.assignments || 0,
                    classWork: grade.classWork || 0,
                    test: grade.test || 0,
                    exam: grade.exam || 0
                })): [];
    
                const totalScore = grades.reduce((sum, grade) => 
                sum + grade.assignments + grade.classWork + grade.test + grade.exam, 0
            );

                return({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    age: student.age,
                    class: student.class,
                    grades: grades,
                    score: totalScore
                })
             
            })

            const bulkStudents = await Student.insertMany(students)
            return bulkStudents

        }catch(error){
            console.log(error)
            throw new Error("failed to create bulk students")
        }
    },

    // createStudent: async (args) => {
    //     try {
    //         // Map grades if provided, ensuring each grade field is set with a default value
    //         const grades = args.studentInput.grades ? args.studentInput.grades.map(grade => ({
    //             assignments: grade.assignments || 0,
    //             classWork: grade.classWork || 0,
    //             test: grade.test || 0,
    //             exam: grade.exam || 0
    //         })) : [];

    //         // Calculate the total score by summing all grade properties
    //         const totalScore = grades.reduce((sum, grade) => 
    //             sum + grade.assignments + grade.classWork + grade.test + grade.exam, 0
    //         );

    //         // Create a new Student instance with the provided inputs and calculated fields
    //         const student = new Student({
    //             firstName: args.studentInput.firstName,
    //             lastName: args.studentInput.lastName,
    //             age: args.studentInput.age,
    //             class: args.studentInput.class,
    //             grades: grades,
    //             score: totalScore
    //         });

    //         // Save the new student to the database
    //         const newStudent = await student.save();
    //         return newStudent;
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error("Failed to set up new student data");
    //     }
    // }

    getStudents: async() => {
        try{
            const students = await Student.find()
            return students
        }catch(error){
            console.log(students)
            throw new Error("failed to fetch students")
        }
    },

    getStudentById: async(_id) => {
        try{
            const student = await Student.findById(_id)
            return student
        }catch(error){
            console.log(error)
            throw new Error(`failed to fetch student with id ${_id}`)
        }
    },

    updateStudent: async({_id, studentInput}) => {
        try{
            const updateField = {}

            const student = await Student.findById(_id)
            const grades = studentInput.grades ?studentInput.grades.map(grade => ({
                assignments: grade.assignments || student.grades.assignments,
                classWork: grade.classWork || student.grades.classWork,
                test: grade.test || student.grades.test,
                exam: grade.exam || student.grades.exam
            })): student.grades

            const totalScore = studentInput.grades ? studentInput.grades.reduce((sum, grade) => 
                sum + grade.assignments + grade.classWork + grade.test + grade.exam, 0
            ): student.score

             if(studentInput.firstName !== undefined) {
                updateField.firstName = studentInput.firstName || student.firstName
             }
             if(studentInput.lastName !== undefined) {
                updateField.lastName = studentInput.lastName || student.lastName
             }
             if(studentInput.class !== undefined) {
                updateField.class = studentInput.class || student.class
             }
             if(studentInput.age !== undefined) {
                updateField.age = studentInput.age || student.age
             }
             if(studentInput.grades !== undefined) {
                updateField.grades = grades
             }
             if(studentInput.score !== undefined) {
                updateField.score = totalScore
             }
        

            const updatedStudent = await Student.findByIdAndUpdate(_id, 
                {$set: updateField},
                {new: true}
            )

            return updatedStudent
        }catch(error){
            console.log(error)
            throw new Error("failed to update student")
        }
    },

    deleteStudent: async(_id) => {
        try{
            const student = await Student.findByIdAndDelete(_id)
            return student
        }catch(error){
            console.log(error)
            throw new Error("failed to delete student with id ${_id}")
        }
    }
}

module.exports = studentResolver