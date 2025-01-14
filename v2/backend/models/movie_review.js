module.exports = (sequelize,DataTypes) => {
    const movie_review = sequelize.define("movie_review",{
        movie_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
          },
          movie_review: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
          },
    });

    return movie_review;
};