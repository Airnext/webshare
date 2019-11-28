let ImageModel = require('../models/image');

module.exports = {
	popular:function(callback){
		ImageModel.find({},{},{limit:9, sort:{likes:-1}}, function(err, images){
			if(err){throw err;}
			
			callback(null, images);
		});
	}
}