var mongoose = require('mongoose')
var validate = require('mongoose-validate')
require('./achievement')
require('./skill')

var Schema = mongoose.Schema

module.exports = function(mongoose) {

    var User = new Schema({
        email               :    {type: String, index: true, required: true, validate: [validate.email, 'invalid email address']},
        //id                  :    ObjectId,
        password            :    String,
        name                :    {
            first           :    String,
            last            :    String
        }
    });

    // declare seat covers here too
    
    var UserAchievement = new Schema({
        user                :    {type: Schema.ObjectId , ref: 'User', index: true },
        achievements        :    [
					  {type: Schema.ObjectId, ref: 'Achivement', time: Date}
                                 ]
    });

    var UserSkill = new Schema({
        user                :    {type: Schema.ObjectId , ref: 'User', index: true },
        skills              :    [
					  {type: Schema.ObjectId, ref: 'Skill', xp: Number, level: Number}
                                 ]
    });




var models = {
      Users : mongoose.model('Users', User),
      UserAchievements : mongoose.model('UserAchievements', UserAchievement),
      UserSkills : mongoose.model('UserSkills', UserSkill)	
 //   Achievements : mongoose.model('Achievements', Achievement),
 //   Skills : mongoose.model('Skills', Skill)	
    };
    return models;
}

