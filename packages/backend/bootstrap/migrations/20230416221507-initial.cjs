const { query } = require("express");
const { DataTypes } = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(
    async (transaction) => {
        // Creating DB.
        await queryInterface.createDatabase("nicasource");
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
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
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
        }, { transaction });

        await queryInterface.addIndex("follow", {
            fields: ["followerId", "followingId"],
            unique: true,
            transaction
        });

        await queryInterface.createTable("like", {
            videoId: {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: {
                        tableName: "video"
                    },
                    key: "id"
                },
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
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
        }, { transaction })

        await queryInterface.addIndex("like", {
            fields: ["creatorId", "videoId"],
            unique: true,
            transaction
        });

        await queryInterface.createTable("credential", {
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
            credentialType: {
                type: DataTypes.ENUM("password", "totp"),
                allowNull: false,
                defaultValue: "password"
            },
            credentialValue: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
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
    }),
    down: (queryInterface) => queryInterface.sequelize.transaction(
    async (transaction) => {
        await queryInterface.dropTable("like", { transaction });
        await queryInterface.dropTable("video", { transaction });
        await queryInterface.dropTable("follow", { transaction });
        await queryInterface.dropTable("credential", { transaction });
        await queryInterface.dropTable("creator", { transaction });
    })
};
