module.exports = {
    attributes : {
        name : {
            type : 'String',
            required : true
        },
        teams : { collection : 'Teams' }
    }
}