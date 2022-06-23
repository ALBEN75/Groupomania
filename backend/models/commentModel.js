const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            models.comment.belongsTo(models.user, { 
                onDelete: "CASCADE"
            });
			models.comment.belongsTo(models.post, { 
                onDelete: "CASCADE"
            });
        }
    }
    Comment.init({
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		contentComment: {
			allowNull: true,
			type: DataTypes.TEXT
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
        modelName: "Comment"
    })
    return Comment
};
