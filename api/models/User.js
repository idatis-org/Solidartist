
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type:DataTypes.STRING,
            allowNull: false
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false
        },
        alias: {
            type:DataTypes.STRING,
            allowNull: false
        },
        profile_type: {
            type:DataTypes.BOOLEAN,
            allowNull: false
        },
        role: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        user_img: DataTypes.STRING,
        profile_img: DataTypes.STRING,
        description: DataTypes.STRING,
        creation_date: DataTypes.DATE

    }, {tableName: 'users', timestamps: false})

    return User
}