const { Schema, model } = require('mongoose');

const ticketTranscriptSchema = new Schema({
  userId: String,
  guildId: String,
  channelId: String,
  content: Array
});

module.exports = model('TicketTranscript', ticketTranscriptSchema);