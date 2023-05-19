//NOTES ONLY

const stripe = require('stripe')('sk_test_51N9BOWDpKmnLMg2OJUManAkWYJVsMJ8GPXH6NC6Iv3gGDoX49EnHLnTNy9pIyPNAQAHYROjB6OunybqaE5uVDNKO0019EaAf3A')

const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000, //amount in cents
    currency: 'usd',
    payment_method_types: ['card'],
});

const customer = await stripe.customers.create({
    email: 'janedoe@gmail.com',
    source: 'tok_visa', //replace this with stripe token or payment method
});

const charge = await stripe.charge.create({
    amount: 1000, //in cents
    currency: 'usd',
    customer: 'CUSTOMER_ID' //replace with actual customer id
});