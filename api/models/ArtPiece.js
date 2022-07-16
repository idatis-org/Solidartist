
module.exports = (sequelize, DataTypes) => {
    const ArtPiece = sequelize.define('ArtPiece', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        piece_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        front_page: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        description: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sell_price: DataTypes.STRING,
        creation_date: DataTypes.DATE

    }, { tableName: 'art_piece', timestamps: false })

    return ArtPiece
}