const { Country, Activity } = require("../../db");

const getCountriesById = async (req, res) => {
  try {
    const { idPais } = req.params;
    const results = await Country.findOne({
      where: { id: idPais },
      include: { model: Activity },
    });

    if (!results) throw new Error("There is no country with that ID");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = getCountriesById;
