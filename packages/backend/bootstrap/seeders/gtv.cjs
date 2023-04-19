const creators = require('./gtv/creator.json');
const credentials = require('./gtv/credential.json');
const follows = require('./gtv/follow.json');
const likes = require('./gtv/like.json');
const videos = require('./gtv/video.json');

function convertDateAttributes(array, attributes) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < attributes.length; j++) {
            array[i][attributes[j]] = new Date(array[i][attributes[j]]);
        }
    }
}

convertDateAttributes(creators, ['createdAt', 'updatedAt']);
convertDateAttributes(credentials, ['createdAt', 'updatedAt']);
convertDateAttributes(follows, ['createdAt', 'updatedAt']);
convertDateAttributes(likes, ['createdAt', 'updatedAt']);
convertDateAttributes(videos, ['createdAt', 'updatedAt','publishedAt']);

module.exports = {
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.bulkInsert('creator', creators, { transaction });
            await queryInterface.bulkInsert('credential', credentials, { transaction });
            await queryInterface.bulkInsert('follow', follows, { transaction });
            await queryInterface.bulkInsert('video', videos, { transaction });
            await queryInterface.bulkInsert('like', likes, { transaction });
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.bulkDelete('like', null, { transaction });
            await queryInterface.bulkDelete('video', null, { transaction });
            await queryInterface.bulkDelete('follow', null, { transaction });
            await queryInterface.bulkDelete('credential', null, { transaction });
            await queryInterface.bulkDelete('creator', null, { transaction });
        });
    }
};