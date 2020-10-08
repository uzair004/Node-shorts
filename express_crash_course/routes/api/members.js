const express = require('express');
const router = express.Router();
const members = require('../../Members');
// package for generating random ID's
const uuid = require('uuid');

// get all members
router.get('/', (req, res) => {
    res.json(members);
});

// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with id ${req.params.id}`});
    }

});

// add new member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v1(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json('Please enter name & email');
    }

    members.push(newMember);
    res.json({msg: 'members added successfully!', members});
    // res.redirect('/');
});

// update existing member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updatedMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;

                res.json({msg: 'member updated successfully!', member});
            }
        });
    } else {
        res.status(400).json({msg: `No member with id ${req.params.id}`});
    }
});

// delete a member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                res.json({msg: 'member deleted!', members: members.filter(member => member.id !== parseInt(req.params.id))});
            }
        });
    } else {
        res.status(400).json({msg: `No member with id ${req.params.id}`});
    }
})

module.exports = router;




