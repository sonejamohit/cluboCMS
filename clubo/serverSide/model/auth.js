const express=require('express');
const app=express();
const { body, validationResult } = require('express-validator');
app.post('/admin',
    [body('username','Enter a valid Email').isEmail(),
    body('password','Enter a valid Password').isLength({ min: 8 })],
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      User.create({
        username: req.body.username,
        password: req.body.password,
      }).then(user => res.json(user));
    },
  );
  