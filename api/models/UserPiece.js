
module.exports = (sequelize, DataTypes) => {
    const UserPiece = sequelize.define('UserPiece', {
        id_creator: DataTypes.INTEGER,
        id_current_owner: DataTypes.INTEGER,
        id_piece: DataTypes.INTEGER

    }, {tableName: 'users_pieces', timestamps: false})

    return UserPiece
}