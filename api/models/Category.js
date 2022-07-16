
module.exports = (sequelize, DataTypes) => {
    const UserPiece = sequelize.define('Category', {
        title: DataTypes.STRING,
        description: DataTypes.STRING

    }, { tableName: 'categories', timestamps: false })

    return UserPiece
}