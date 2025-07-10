import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  // Adicione outros campos conforme necessário
}, {
  timestamps: true,
});

const Music = mongoose.model('Music', musicSchema);

export default Music;