import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({    
    // Adicione outros campos conforme necessário
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

export default Report;