const { Router } = require("express");

const getCountries = require("../controllers/Country/getCountries");
const getCountriesById = require("../controllers/Country/getCountriesById");
const getCountriesByName = require("../controllers/Country/getCountriesByName");

const createActivity = require("../controllers/Activity/createActivity");
const getActivities = require("../controllers/Activity/getActivity");

const router = Router();


router.get("/countries", getCountries);
router.get("/countries/name", getCountriesByName);
router.get("/countries/:idPais", getCountriesById);

router.post("/activities", createActivity);
router.get("/activities", getActivities);




module.exports = router;
