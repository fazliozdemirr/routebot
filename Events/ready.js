module.exports = {
  name: `ready`,
  async run(ready, { client, Discord }) {

    const { uri } = require('../config.json');
    
    client.user.setActivity('Nexon Logistics', {
      type: 'WATCHING'
    });

        //Connect database
    const mongoose = require('mongoose');
    await mongoose.connect(
      uri || ``, {
        keepAlive: true
      })
      .then(() => {
        console.log('MongoDB: Connected')
      })
      .catch(e =>
        console.log(`MongoDB: Not Connected\nError: ${e}`)
      );

  }
}