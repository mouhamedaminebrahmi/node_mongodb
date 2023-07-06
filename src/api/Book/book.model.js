module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      categoryId: String,
      title: String,
      description: String,
      published: Boolean,
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const SchemaModel = mongoose.model("books", schema);
  return SchemaModel;
};
