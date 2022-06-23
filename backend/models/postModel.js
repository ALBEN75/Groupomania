const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            models.post.belongsTo(models.user, { 
                onDelete: "CASCADE"
            })
			models.post.hasMany(models.comment)
			models.post.hasMany(models.like)
        }
    }
    Post.init({
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		content: {
			allowNull: true,
			type: DataTypes.TEXT
		},
		file: {
			allowNull: true,
			type: DataTypes.STRING
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	}, 
    {
        //indique a squelize le nom de la table
        sequelize,
        modelName: "Post"
    })
    return Post
};
