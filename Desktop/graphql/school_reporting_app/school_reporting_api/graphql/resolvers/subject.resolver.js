const Topics = require("../../models/topic.model")
const Subject = require("../../models/subjects.model")

const subjectResolver = {
    createTopic: async(args) => {
        console.log("s")
        console.log(args.TopicInput.topicTitle)
        console.log("d")
        try{
            const topic = new Topics({
                topicTitle: args.TopicInput.topicTitle,
                numberOfWeeks: args.TopicInput.numberOfWeeks,
                class: args.TopicInput.class,
                term: args.TopicInput.class
            })
    
            const result = await topic.save()
            console.log(result)
            return ({
                topicTitle: result.topicTitle,
                numberOfWeeks: result.numberOfWeeks,
                class: result.class,
                term: result.term
            })
        }catch(error){
            console.log(error)
        }
    },
    
    createMultipleTopics: async ({TopicInput}) => {
        try{
            const createMultipleTopics = TopicInput.map(topic => ({
                    topicTitle: topic.topicTitle,
                    numberOfWeeks: topic.numberOfWeeks,
                    class: topic.class,
                    term: topic.term
            }))
            const multipleTopics = await Topics.insertMany(createMultipleTopics)
            return multipleTopics
        }catch(error){
            console.log(error)
        }
    },
    
    getTopics: async() => {
        try{
            const topics = await Topics.find()
            return topics
        }catch(error){
            console.log(error)
        }
    },

    getTopicById: async({_id}) => {
        try{
            const topic = await Topics.findById(_id)
            return topic
        }catch(error){
            console.log(error)
        }
    },

    deleteTopic: async({_id}) => {
        try{
            console.log(_id)
            const topic = await Topics.findByIdAndDelete(_id)

            if(!topic) {
                throw new Error("topic not found")
            }

            return ("topic successfully deleted", topic)
        }catch(error){
            console.log(error)
            throw new Error("failed to delete topic")
        }
    },

    updateTopic1: async({_id, TopicInput}) => {
        try{
            const topic = await Topics.findByIdAndUpdate(_id, {
                topicTitle: TopicInput.topicTitle,
                numberOfWeeks: TopicInput.numberOfWeeks,
                class: TopicInput.class,
                term: TopicInput.term
            }, {new: true})

            if(!topic){
                throw new Error("topic not found")
            }
            return topic;
        }catch(error){
            console.log(error)
        }
    },

    updateTopic2: async({_id, topicInput}) => {
        try{
            const updateField = {}
            // if(topicInput.topicTitle !== undefined) {
            //     updateField.topicTitle = topicInput.topicTitle
            // }
            // if(topicInput.numberOfWeeks !== undefined) {
            //     updateField.numberOfWeeks = topicInput.numberOfWeeks
            // }
            // if(topicInput.class !== undefined) {
            //     updateField.class = topicInput.class
            // }
            // if(topicInput.term !== undefined) {
            //     updateField.term = topicInput.term
            // }

            Object.keys(topicInput).forEach(topic => {
                if(topicInput[topic] !== undefined) {
                    updateField[topic] = topicInput[topic]
                }
            })

            const updatedTopic = await Topics.findByIdAndUpdate(_id, 
                    {$set: updateField},
                    {new: true} 
                )

                if(!updatedTopic) {
                    throw new Error("failed to find topic")
                }

                return updatedTopic

        }catch(error){
            console.log(error)
        }
    },

    createSubject: async(args) => {
        try{
            const newTopics = args.subjectInput.topics.map(topic => ({    
                    topicTitle: topic.topicTitle,
                    numberOfWeeks: topic.numberOfWeeks,
                    class: topic.class,
                    term: topic.term
            }))

            const newSubject = new Subject({
                subjectName: args.subjectInput.subjectName,
                topics: newTopics
            })
            const subject = newSubject.save()
            return subject
        }catch(error){
            console.log(error)
        }
    },

    getSubjects: async() => {
        try{
            const subjects = await Subject.find()
            return subjects
        }catch(error){
            console.log(error)
        }
    },

    getSubjectById: async(_id) => {
        try{
            const subject = await Subject.findById(_id);
            return subject
        }catch(error){
            console.log(error)
        }
    },

    updateSubject: async({_id, subjectInput}) => {
        try{
            // update all fields
            // const topics = subjectInput.map(topic => ({
            //     topicTitle: topic.topicTitle,
            //     numberOfWeeks: topic.numberOfWeeks,
            //     class: topic.class,
            //     term: topic.term
            // }))
            // const subject = await Subject.findByIdAndUpdate(_id, {
            //     subjectName: subjectInput.subjectName,
            //     topics: topics
            // }, {new: true})

            // update fields optionally
            const updateField = {}
            //  if (subjectInput.subjectName !== undefined){
            //     updateField.subjectName = subjectInput.subjectName
            //  }

            //  if(subjectInput.topics !== undefined) {
            //     updateField.topics = subjectInput.topics.map(topic => ({
            //         topicTitle: topic.topicTitle,
            //         numberOfWeeks: topic.numberOfWeeks,
            //         class: topic.class,
            //         term: topic.term
            //     }))
            //  }

            //optimized
            Object.keys(subjectInput).forEach(key => {
                if(key === "topics" && subjectInput[key] !== undefined ){
                    updateField[key] = subjectInput[key].map(topic => ({
                        topicTitle: topic.topicTitle,
                        numberOfWeeks: topic.numberOfWeeks,
                        class: topic.class,
                        term: topic.term
                    }))
                }else if(subjectInput[key] !== undefined){
                    updateField.subjectInput = subjectInput[key]
                }
            })

             const updatedSubject = await Subject.findByIdAndUpdate(
                    _id, 
                    {$set: updateField},
                    {new: true}
                )

            return updatedSubject
        }catch(error){
            console.log(error)
        }
    }

    // getSubectsByClass: async(class) => {
    //     try{
    //         const subjects = await subject. 
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

}

module.exports = subjectResolver
