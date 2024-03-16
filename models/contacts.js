module.exports = (mongoose) => {
  const Contact = mongoose.model(
    'contacts',
    mongoose.Schema(
      {
        firstName: String,
        lastName: String,
        email: String,
        cellphoneNumber: Number,
        birthday: String,
        address: String,
        isActive: Boolean
      }
    )
  );

  return Contact;
};
