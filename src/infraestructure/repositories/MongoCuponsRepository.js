const CuponsRepository = require("../../domain/repositories/CuponsRepository");
const CuponsModel = require("../database/models/CuponsModel");
const Cupons = require("../../domain/entities/Cupons");

class MongoCuponsRepository extends CuponsRepository {
  async getAll() {
    const cupons = await CuponsModel.find().lean().exec();
    return cupons.map((c) => new Cupons(c.toObject()));
  }
  async create(cupons) {
    const newCupons = await CuponsModel.create(cupons);
    return new Cupons(newCupons.toObject());
  }

  async getById(id) {
    const cupon = await CuponsModel.findOne({ _id: id }).lean().exec();
    if (!cupon) {
      return null;
    }
    return cupon.toObject();
  }
}
module.exports = MongoCuponsRepository;
