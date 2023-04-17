module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(
    async (transaction) => {
        // Creating Tables.
        await queryInterface.createTable("creator", {
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
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            }
        },{ transaction });

        await queryInterface.createTable("video", {
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
            },
            creatorId: {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: {
                        tableName: "creator"
                    },
                    key: "id"
                },
                allowNull: false
            }
        }, { transaction });

        await queryInterface.createTable("follow", {
            id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            followerId: {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: {
                        tableName: "creator"
                    },
                    key: "id"
                },
                allowNull: false
            },
            followingId: {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: {
                        tableName: "creator"
                    },
                    key: "id"
                },
                allowNull: false
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
        }, { transaction });

        await queryInterface.addIndex("follow", {
            fields: ["followerId", "followingId"],
            type: "UNIQUE",
            unique: true,
            transaction
        });

    }),
    down: (queryInterface) => queryInterface.sequelize.transaction(
    async (transaction) => {
        await queryInterface.dropTable("video", { transaction });
        await queryInterface.dropTable("follow", { transaction });
        await queryInterface.dropTable("creator", { transaction });
    })
};
