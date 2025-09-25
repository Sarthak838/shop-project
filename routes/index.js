const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')

// Welcome Page
router.get('/account', (req, res) => res.render('welcome'))


// Dashboard
router.get('/dashboard', ensureAuthenticated,
(req,res) =>res.render('dashboard', {
    name: req.user.name
}));


//Contact us
router.post('/contact', (req, res)=>{
    const {name , email, message} = req.body;
    console.log("Contact form submitted:" , name,  email, message);

    res.send("Thank you for contacting! we'll get back to you soon. ")
})

module.exports = router;