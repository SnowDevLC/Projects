const { Router } = require("express");

const getCountries = require("../controllers/getCountries");
const getCountriesById = require("../controllers/getCountriesById");
const getCountriesByName = require("../controllers/getCountriesByName");

const createActivity = require("../controllers/createActivity");
const getActivities = require("../controllers/getActivity");

const router = Router();


router.get("/countries", getCountries);
router.get("/countries/name", getCountriesByName);
router.get("/countries/:idPais", getCountriesById);

router.post("/activities", createActivity);
router.get("/activities", getActivities);




module.exports = router;
