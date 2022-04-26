export const customPlugin = (schema, options) => {
    schema.pre('save', function (next) {
        console.log('pre-save')
        next()
    })

    schema.post('save', function (next) {
        console.log('post-save')
        next()
    })
}