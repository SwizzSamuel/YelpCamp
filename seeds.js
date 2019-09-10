const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comments = require('./models/comments');

const data = [
    {
        name: 'Poseidons lair',
        image: 'https://images.unsplash.com/photo-1432071375803-08a3f5fd224f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        description: 'Junior brother of Zeus in charge of the water bodies.Easily identified with his famous trident that acts as an object of superiority over the seas.Took part in the war against their father Titan alongside his brothers Zeus and Hades.Betrayed,he struck an accord with Zeus to keep Hades at bay and check all his moves.Harboured feelings for Athena the goddess of battle strategies and wisdom although it was barely reciprocated.'
    },
    {
        name: 'Hades Paradise',
        image: 'https://images.unsplash.com/photo-1541051595295-e7d4ae8b845f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        description: 'God of death and the underworld.A naive,powerful and disconnected young man who felt the need for power after the disposal of Titan.He came up against his brothers who stood against his lust for centralized power and total dominion over all other beings.He was banished to the underworld for eternity and always schemes to escape to take his rightful place at Olympus.'
    },
    {
        name: 'Godrics hollow',
        image: 'https://images.unsplash.com/photo-1525291713758-6c2990e200ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        description: 'Birthplace of the famous Harry Potter.A symbolic location for Gryfindor alums where they can find solitude and calm.A place of great and unharboured power where it is widely regraded that power is enhanced at this very spot.'
    }
]

function seedDB() {
    // Remove Campgrounds
        Campground.remove({}, (err) => {
        if(err) { 
            console.log(err)
        } else {
            console.log('Removed campgrounds');
        }
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Added a campground');
                  // create a comment
                    Comments.create({
                        text: 'Still doesnt negate the fact that one of the most gruesome murders of the wizarding history happened here',
                        author: 'Luna'
                        }, (err, comment) => {
                        if(err) {
                            console.log(err)
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('Added a new comments');
                        }
                    });
                }
            });
        });
    });
}    
    
module.exports = seedDB;
    
    
