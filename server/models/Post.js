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
    rating: [{
      type: Number
    }]
  },
  {
    toJSON: {
      virtuals: true,
    },
} 
);

// Virtual to calculate rate average
postSchema.virtual("rateAverage").get(function () {
  if (this.rating.length === 0) {
    return 0;
  }

  const totalRate = this.rating.reduce((accumulator, rate) => {
    return accumulator + rate;
  }, 0);

  return totalRate / this.rating.length;
});

// Virtual to format the price with a dollar sign
postSchema.virtual("formattedPrice").get(function () {
  return `$${this.price}`;
});

const Post = model("Post", postSchema);

module.exports = Post;
