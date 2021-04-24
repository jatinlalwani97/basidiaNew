module.exports = {
    up: async (queryInterface, Sequelize) => {
        // declare transaction outside try catch so it is available in both
        const Trigger = require('../models/trigger');
        const transaction = await queryInterface.sequelize.transaction()
        try {
            // No need to use transactions for read operations
            const triggers = await Trigger.findAll()
    
            // using for...of loop which supports awaiting inside it
            for await (const trigger of triggers) {

                    // Make sure to await on all sequelize methdos
                await trigger.update({ "event_name": "User added","event_description":"User added" })
            }
    
            // Commit transaction if no error occurs
            await transaction.commit()
        } catch (error) {
            // Rollback transaction if error occurs
            await transaction.rollback()
            console.error("Something went wrong: ", ex)
        }
    },
    down: (queryInterface, Sequelize) => {
        console.log("failed")
      return 'failed';
    },
  };
  