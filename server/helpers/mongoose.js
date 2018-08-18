// handling controller中的user中的register的ERR条件
//ERROR是个array，因为可能有多个error，
//error的输出格式为你push的格式。
module.exports = {
    normalizeErrors: function(errors) {
        let normalizeErrors = [];

        for (let property in errors) {
            if (errors.hasOwnProperty(property)) {
                normalizeErrors.push({title: property, detail: errors[property].message});
            }
        }

        return normalizeErrors;
    }
}