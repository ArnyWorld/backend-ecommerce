const CreateCupons = require("../../application/useCases/CreateCupons");
const CuponsDTO = require("../../application/dtos/CuponsDTO");

class CuponsController {
  constructor(cuponsRepository) {
    this.createCupons = new CreateCupons(cuponsRepository);
  }

  async create(req, res) {
    try {
      const cupons = await this.createCupons.execute(req.body);
      res.status(201).json(new CuponsDTO(cupons));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const cupons = await this.cuponsRepository.getAll();
      res.status(200).json(cupons);
    } catch (err) {
      res.status(500).json({ message: "Error retrievingk cupons" });
    }
  }

  async getAllById(req, res) {
    try {
      const cupon = await this.cuponsRepository.getById(req.params.id);
      if (!cupon) {
        return res.status(404).json({ message: "Cupon not found" });
      }
      res.status(200).json(cupon);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving cupon" });
    }
  }
}

module.exports = CuponsController;
