'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const reports = [{
      report_id: 'ab2f6d29-8dee-436d-9bb3-9e9e5d025280',
      time: '2025-02-25 09:00:00'
    }, {
      report_id: '705f8872-660d-482b-90ae-bc7a8f3294ee',
      time: '2025-02-25 09:30:00'
    }, {
      report_id: '5feb1e43-8397-4398-971e-2872ce5afbec',
      time: '2025-02-25 10:00:00'
    }, {
      report_id: 'e8325391-9f97-4b74-85b4-eabdc35df441',
      time: '2025-02-25 10:30:00'
    }, {
      report_id: '1757974c-fb3f-4701-86e1-0e4fcd8ea246',
      time: '2025-02-25 11:00:00'
    }, {
      report_id: 'bc4707c2-76dc-4569-be5f-88b6e315b004',
      time: '2025-02-25 11:30:00'
    }, {
      report_id: 'd8cb10bf-422f-493b-84f2-01adf97b8751',
      time: '2025-02-25 14:00:00'
    }, {
      report_id: '73d8f39b-593e-4bed-8913-4b678b3a6745',
      time: '2025-02-25 14:30:00'
    }, {
      report_id: '9c2508f2-333a-46d5-8f25-ade34b882773',
      time: '2025-02-25 15:00:00'
    }, {
      report_id: '43b1a660-0050-4d4c-830e-1ba622e0559a',
      time: '2025-02-25 15:30:00'
    }, {
      report_id: '47e0147d-c43e-4171-89dc-7609dd97b366',
      time: '2025-02-25 16:00:00'
    }, {
      report_id: 'eb6e6fc5-b696-4bf7-96d9-ffa0ec098604',
      time: '2025-02-25 16:30:00'
    }];

    await queryInterface.bulkInsert('reports', reports.map(text => ({
      ...text,
      createdAt: new Date(), 
      updatedAt: new Date()      
    })));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reports', null, {});
  }
};
