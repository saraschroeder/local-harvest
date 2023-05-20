const User = require("../models/User");
const Post = require("../models/Post");
const Review = require("../models/Review");

// Function to seed the database with user, post, and review data
const seedData = async () => {
  try {
    // Create users in the database
    const createdUsers = await User.create([
      {
        email: "farmerdan@thefarm.com",
        userName: "DannyBoy1959",
        password: "password1",
        role: "farmer",
        businessName: "Vegetebowl",
        location: "La Crescent, MN",
        description:
          "Farmer Dan runs the Vegetabowl in La Crescemt Minnesota, where you can always find your favorite veggies!",
        image: "user1.jpg",
      },
      {
        email: "shopaholic@market.net",
        userName: "MoneyPleeez",
        password: "billionare95",
        role: "user",
      },
    ]);

    console.log("Users seeded:", createdUsers);

    // Create posts in the database
    const createdPosts = await Post.create([
      {
        userId: createdUsers[0]._id,
        title: "Eggplants!",
        image: "post1.jpg",
        description: "The purplest eggplants you ever saw!",
        price: 2.0,
        reviews: [],
      },
      {
        userId: createdUsers[0]._id,
        title: "Beets!",
        image: "post2.jpg",
        description: "You cant beat these beets!",
        price: 70.0,
        reviews: [],
      },
    ]);

    console.log("Posts seeded:", createdPosts);

    // Create reviews in the database
    const createdReviews = await Review.create([
      {
        userId: createdUsers[1]._id,
        postId: createdPosts[0]._id,
        text: "They really were very purple!",
        rate: 5,
      },
      {
        userId: createdUsers[1]._id,
        postId: createdPosts[1]._id,
        text: "I could only buy ten of them since they were $70 :( ",
        rate: 1,
      },
    ]);

    console.log("Reviews seeded:", createdReviews);
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedData();
