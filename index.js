"use strict";
var _ = require('underscore');
var mandatoryEnum = Object.freeze({
    //use objects for better equals checking
    STRING: {
        'eq': 'string'
    },
    NUMBER: 1,
    BOOLEAN: 2,
    FUNCTION: 3
});

module.exports = {
    mandatory: mandatoryEnum,
    verify: function(parameterObjectContract, parameterObject) {
        var verifiedParamObj = {};

        function checkMandatory(key) {
            if (parameterObjectContract[key] === mandatoryEnum.STRING && !_.isString(parameterObject[key])) {
                throw "Mandatory parameter missing";
            }
        };

        function checkCorrectType(key) {
            if (typeof parameterObjectContract[key] !== typeof verifiedParamObj[key]) {
                throw typeof parameterObjectContract[key] + " type expected";
            }
        };

        function useValueOrDefaultFor(key, value) {
            return (_.isUndefined(parameterObject[key]) || _.isNull(parameterObject[key])) ? value : parameterObject[key];
        }

        _.each(parameterObjectContract, function(value, key, list) {
            checkMandatory(key);
            verifiedParamObj[key] = useValueOrDefaultFor(key, value);
            checkCorrectType(key);
        });

        return verifiedParamObj;
    }
};