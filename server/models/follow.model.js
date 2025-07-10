import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({    
    // Adicione outros campos conforme necessário
}, {
  timestamps: true,
});

const Follow = mongoose.model('Follow', followSchema);

export default Follow;