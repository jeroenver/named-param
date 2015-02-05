var _ = require('underscore');

module.exports = {
	verify : function(parameterObjectContract, parameterObject){
		var verifiedParamObj = {};
		_.each(parameterObjectContract, function(value, key, list){
			verifiedParamObj[key] = (_.isUndefined(parameterObject[key]) || _.isNull(parameterObject[key])) ? value : parameterObject[key];
		});
		return verifiedParamObj;
	}
};