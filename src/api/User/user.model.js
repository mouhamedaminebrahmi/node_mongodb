module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      nom: String,
      prenom: String,
      email: String,
      password: String,
      image: String,
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "admin",
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const SchemaModel = mongoose.model("users", schema);
  return SchemaModel;
};
