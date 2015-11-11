
// controllers/todo.js
var express = require('express');
var router = express.Router();

var decorateTodos = require('../viewmodels/todo');

// Hibalista oldal
router.get('/list', function (req, res) {
    req.app.models.todo.find().then(function (errors) {
        res.render('todo/list', {
            errors: decorateTodos(errors),
            messages: req.flash('info')
        });
    });
});

// Hiba felvitele
router.get('/new', function(req, res) {
    var validationTodos = (req.flash('validationTodos') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
    res.render('todo/new', {
        validationTodos: validationTodos,
        data: data,
    });
})

// Feladat felvétele POST
router.post('/new', function(req, res) {
   // adatok ellenőrzése
    req.checkBody('feladat', 'Feladat neve').notEmpty().withMessage('Kötelező megadni!');
    req.sanitizeBody('leiras').escape();
    req.checkBody('leiras', 'Feladat leírás').notEmpty().withMessage('Kötelező megadni!');
    
    var validationTodos = req.validationErrors(true);
    console.log(validationTodos);
    
    if (validationTodos) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationTodos);
        req.flash('data', req.body);
        res.redirect('/todo/new');
    }
    else {
        req.app.models.todo.create({
            status: 'new',
            location: req.body.feladat,
            description: req.body.leiras
        })
        .then(function (error) {
            //siker
            req.flash('info', 'Feladat sikeresen felvéve!');
            res.redirect('/todo/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err)
        });
    }
})

module.exports = router;

