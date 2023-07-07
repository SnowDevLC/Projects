const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getCountriesById = async (req, res) => {
  try {
    const { name } = req.query;
    const results = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: { model: Activity },
    });

    if (!results) throw new Error("No hay país con ese Nombre");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCountriesById;
