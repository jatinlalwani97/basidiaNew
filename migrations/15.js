module.exports = {
    up: async (queryInterface, Sequelize) => {
        // declare transaction outside try catch so it is available in both
        const Action = require('../models/action');
        const transaction = await queryInterface.sequelize.transaction()
        try {
            // No need to use transactions for read operations
            const actions = await Action.findAll()
    
            // using for...of loop which supports awaiting inside it
            for await (const action of actions) {

                    // Make sure to await on all sequelize methdos
                await action.update({ "event_name": "Add users to !classroom","event_description":"Add users to !classroom" })
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
  