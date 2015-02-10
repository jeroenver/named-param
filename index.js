"use strict";
var _ = require('underscore');

module.exports = {
    mandatory: Object.freeze({
        STRING: 0,
        NUMBER: 1,
        BOOLEAN: 2,
        FUNCTION: 3
    }),
    verify: function(parameterObjectContract, parameterObject) {
        var verifiedParamObj = {};

        function checkMandatory(key) {
            //should be this.mandatory.STRING  iso 0
            if (parameterObjectContract[key] === 0 && !_.isString(parameterObject[key]))
                throw "Mandatory parameter missing";
        };

        function checkCorrectType(key) {
            if (typeof parameterObjectContract[key] !== typeof verifiedParamObj[key])
                throw typeof parameterObjectContract[key] + " type expected";
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