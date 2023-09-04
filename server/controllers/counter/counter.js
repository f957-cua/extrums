const UserModel = require("../../collections/users/users.js");

class counterController {
  getCurrent(req, res) {
    try {
      const { currentValue, valueList } = req.user;
      res.status(200).json({
        currentValue,
        valueList,
        message: "Received init counter value",
      });
    } catch (error) {
      console.log(error);
      res.status(406).json({ message: "Old user item in DB" });
    }
  }

  async postValue(req, res) {
    try {
      const { currentValue } = req.body;
      console.log(currentValue);
      const { _id, valueList } = req.user;
      valueList.push({ currentValue, date: Date.now() });
      console.log(_id, valueList);

      const update = await UserModel.findByIdAndUpdate(
        { _id },
        { currentValue, valueList },
        { new: true }
      );

      res.status(201).json({ update, message: "Counter value was updated" });
    } catch (error) {
      console.log(error);
      return res.status(503).json({ message: "Service Unavailable" });
    }
  }
}

module.exports = new counterController();
