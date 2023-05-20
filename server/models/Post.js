const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual to calculate rate average
postSchema.virtual("rateAverage").get(function () {
  if (this.reviews.length === 0) {
    return 0;
  }

  const totalRate = this.reviews.reduce((accumulator, review) => {
    return accumulator + review.rate;
  }, 0);

  return totalRate / this.reviews.length;
});

const Post = model("Post", postSchema);

module.exports = Post;
