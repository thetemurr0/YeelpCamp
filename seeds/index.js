const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelpCamp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random].city} ${cities[random].state}`,
            author:'626930dc0a45af79e72e30d3',
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet dolor? Distinctio exercitationem voluptatem nulla a quasi commodi adipisci nihil ad? Qui cumque in incidunt aperiam voluptatibus animi laudantium temporibus ipsum.',
            price,
            geometry : { 
             type : "Point",
             coordinates : [cities[random].longitude, cities[random].latitude] 
            },
            images:  [
              {
                url: 'https://res.cloudinary.com/dktwiofkt/image/upload/v1651767019/yelpCamp/uj6a4rshn1pelh6pzquk.jpg',
                filename: 'yelpCamp/uj6a4rshn1pelh6pzquk'
              },
              {
                url: 'https://res.cloudinary.com/dktwiofkt/image/upload/v1651767021/yelpCamp/s39wukpjyrpackpsuvui.jpg',
                filename: 'yelpCamp/s39wukpjyrpackpsuvui'
              }
              ]
        });
        await camp.save();
    }
};

seedDB().then(() => mongoose.connection.close());
