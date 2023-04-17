module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(
    async (transaction) => {
        // Creating Tables.
        await queryInterface.createTable("user", {
            id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            deletedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true
            },
            title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            publishedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            isPublished: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            videoUrl: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        });
    }),
    down: (queryInterface) => queryInterface.sequelize.transaction(
    async (transaction) => {
        await queryInterface.dropTable("user");
    })
};
