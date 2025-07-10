import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({    
    // Adicione outros campos conforme necessário
}, {
  timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;