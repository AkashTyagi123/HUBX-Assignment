const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const router = express.Router();
router.use(express.json());
router.get('/',(req,res)=>{
   Event.find()
   .then(events=>res.json(events))
   .catch(err=>res.json({"msg":"Some thing wrong happened"}));
});

router.post('/',auth,(req,res)=>{
   const {name,info,date,category,source,contact,location} = {...req.body};
   const newEvent = Event({
      name,
      info,
      date,
      category,
      source,
      contact,
      location

   });
   newEvent.save()
   .then(ev=>res.status(200).json({"msg":"Event created"}))
   .catch(err=>res.status(500).json({"msg":err}));
});
module.exports = router;