const express = require("express");
const path = require("path");
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../index.html'));
});


apiRouter.get('/api/characters', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify([{
        'image': 'https://cdn.hiptoro.com/wp-content/uploads/2020/04/Demon-Slayer-Kimetsu-no-Yaiba-Chapter-202-Release-Date-Spoilers-Tanjiro-to-become-the-Demon-King-1152x668.jpg',
        'name': 'Tanjiro',
        'genre': 'Anime',
        'title': 'Demon Slayer',
        'eyecolor': 'red',
        'haircolor': 'brown',
        'height': 'average',
        'age': '18',
        'tags': ['sword', 'fighter', 'mask', 'water']
    }, {
        'name': "Thor",
        'genre': "Series",
        'title': "Thor (Marvel)",
        'gender': "Male"
    }, {
        'image': "https://i.pinimg.com/originals/1e/e6/eb/1ee6eb21f89e36307bfc293f8b73b972.jpg",
        'name': "Mirio",
        'genre': "Anime ",
        'title': "My Hero Academia",
        'eyecolor': 'blue',
        'haircolor': 'blonde',
        'height': 'tall',
        'age': '18',
        'tags': ['hero', 'optimistic', 'funny', 'meelee']
    }]));
    // extract all tags, and search
    // full text search on database
});

module.exports = apiRouter;
