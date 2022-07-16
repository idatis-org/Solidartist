module.exports = (sequelize, DataTypes) => {
    const CategoryPiece = sequelize.define('CategoryPiece', {
        id_category: DataTypes.INTEGER,
        id_piece: DataTypes.INTEGER

    }, { tableName: 'categories_pieces', timestamps: false })

    return CategoryPiece
}