'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'title_id', {
      type: Sequelize.INTEGER,
      allowNull: true, 
    });

    let tasks = await queryInterface.sequelize.query(
      `SELECT id FROM Tasks ORDER BY id;`
    );

    let rownum = 0;
    for (let task of tasks[0]) {
      rownum++;
      await queryInterface.sequelize.query(
        `UPDATE Tasks SET title_id = ${rownum} WHERE id = ${task.id};`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    // Удаление колонки title_id при откате миграции
    await queryInterface.removeColumn('Tasks', 'title_id');
  }
};
