const { Activity, Country } = require("../db");

const createActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    if (!countries || countries.length <= 0) {
      return res.status(400).json({ error: "Country not found" });
    }

    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    if (countries && countries.length > 0) {
      const associatedCountries = await Country.findAll({
        where: {
          id: countries
        }
      });
      await newActivity.setCountries(associatedCountries);
    }

    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: "Server error occurred" });
  }
};

module.exports = createActivity;
