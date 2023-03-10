const express = require('express');
const chirpsStore = require('../chirpstore');

let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        res.json(chirpsStore.GetChirp(id));
    } else {
        const rawChirps = chirpsStore.GetChirps();
        delete rawChirps.nextid;
        const chirpArr = Object.keys(rawChirps).map(key => ({ id: key, ...rawChirps[key] }));
        res.json(chirpArr);
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.json({ message: "Successfully created chirp" });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    chirpsStore.UpdateChirp(id, req.body);
    res.json({ message: "Successfully edited chirp" });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpsStore.DeleteChirp(id);
    res.json({ message: "Successfully deleted chirp" });
});

module.exports = router;