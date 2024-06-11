const Student = require("../../models/student.model")
const Class = require("../../models/class.model")

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
            console.log(newStudent)

            const studentClass = await Class.findOne({className: student.class})
            if(!studentClass) {
                throw new Error("class not found")
            }
            studentClass.students.push(student)
            studentClass.numberOfStudents += 1
            await studentClass.save()
            console.log(studentClass)
            
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

            if(!student) {
                throw new Error("student not found")
            }

            const grades = studentInput.grades ? studentInput.grades.map((grade, index) => ({
                assignments: grade.assignments !== undefined ? grade.assignments : (student.grades[index]?.assignments) || 0,
                classWork: grade.classWork !==undefined ? grade.classWork : (student.grades[index]?.classWork) || 0,
                test: grade.test !== undefined ? grade.test : (student.grades[index]?.test) || 0,
                exam: grade.exam !== undefined ? grade.exam : (student.grades[index]?.exam) || 0
            })): student.grades

            console.log(grades[0].assignments)

            const gradesScore = grades[0].assignments + grades[0].classWork + grades[0].test + grades[0].exam
            console.log(gradesScore)
            const totalScore =  gradesScore  ;
            console.log("totalScore", totalScore)

            //  if(studentInput.firstName !== undefined) {
            //     updateField.firstName = studentInput.firstName || student.firstName
            //  }
            //  if(studentInput.lastName !== undefined) {
            //     updateField.lastName = studentInput.lastName || student.lastName
            //  }
            //  if(studentInput.class !== undefined) {
            //     updateField.class = studentInput.class || student.class
            //  }
            //  if(studentInput.age !== undefined) {
            //     updateField.age = studentInput.age || student.age
            //  }
            //  if(studentInput.grades !== undefined) {
            //     updateField.grades = grades
            //  }
            //  if(studentInput.score !== undefined) {
            //     updateField.score = totalScore
            //  }

            Object.keys(studentInput).forEach(key => {
                if((key === "grades") && studentInput[key] !== undefined){
                    updateField[key] = grades
                } else if(studentInput[key] !== undefined) {
                    updateField[key] = studentInput[key]
                }
            });

            updateField["score"] = totalScore

            console.log(updateField)
        

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