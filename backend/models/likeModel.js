const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            models.like.belongsTo(models.user, { 
                onDelete: "CASCADE"
            });
			models.like.belongsTo(models.post, { 
                onDelete: "CASCADE"
            });
        }
    }
    Like.init({
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
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
        modelName: "Like"
    })
    return Like
};
