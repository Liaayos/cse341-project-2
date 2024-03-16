module.exports = (mongoose) => {
    const Cellphone = mongoose.model(
      'cellphones',
      mongoose.Schema(
        {
          brand: String,
          model: String,
          series: String,
        }
      )
    );
  
    return Cellphone;
  };
  