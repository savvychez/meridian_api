const express = require('express');
const fs = require('fs');
const router = express.Router();
const zeroFill = require('zero-fill')

router.get("/map", (req, res) => {
    let map = fs.readFileSync('./resources/map_5k.jpg');
    res.writeHead(200, {
        'Content-Type': 'image/gif'
    });
    res.end(map, 'binary');
})

router.get("/bump", (req, res) => {
    let bump = fs.readFileSync('./resources/bump_10k.jpg');
    res.writeHead(200, {
        'Content-Type': 'image/gif'
    });
    res.end(bump, 'binary');
})

router.get("/heatmap/:year/:month/:day", (req, res) => {
    const year = req.params.year;
    const month = zeroFill(2, req.params.month);
    const day = zeroFill(2, req.params.day);
    const path = `../meridian_data/out/img/${year}/${year}-${month}-${day}_300_oisst.png`

    if (fs.existsSync(path)) {
        let heatmap = fs.readFileSync(path);
        res.writeHead(200, {
            'Content-Type': 'image/gif'
        });
        res.end(heatmap, 'binary');
    } else {
        res.end({
            error: true,
            msg: "DATE NO AVAIL"
        })
    }
})

router.get("/stats/:year/:month/:day", (req, res) => {
    const year = req.params.year;
    const month = zeroFill(2, req.params.month);
    const day = zeroFill(2, req.params.day);
    const path = `../meridian_data/out/stats/${year}/${year}-${month}-${day}.json`

    if (fs.existsSync(path)) {
        let jsonFile = fs.readFileSync(path);
        let data = JSON.parse(jsonFile);
        res.status(200).json(data);
    } else {
        res.send({
            error: true,
            msg: "DATE NO AVAIL"
        })
    }
})

router.get("/time_series/:year", (req, res, next) => {

})

module.exports = router