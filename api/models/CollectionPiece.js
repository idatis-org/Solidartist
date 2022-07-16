module.exports = (sequelize, DataTypes) => {
    const CollectionPiece = sequelize.define('CollectionPiece', {
        id_collection: DataTypes.INTEGER,
        id_piece: DataTypes.INTEGER

    }, { tableName: 'collections_pieces', timestamps: false })

    return CollectionPiece
}