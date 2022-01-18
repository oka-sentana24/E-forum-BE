var jwt = require("jsonwebtoken");

const { secret } = require("../config");
const db = require("../db");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, secret);
}

// var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// var string_length = 8;
// var randomstring = "";
// for (var i = 0; i < string_length; i++) {
//   var rnum = Math.floor(Math.random() * chars.length);
//   randomstring += chars.substring(rnum, rnum + 1);
// }

// exports.signin = function (req, res) {
//   res.send({ token: tokenForUser(req.user) });
// };

// Api Create Siswa
exports.createSiswa = async (req, res, next) => {
  const { email, password, ...dataSiswa } = req.body;

  const user = await db.user.create({
    data: {
      email,
      password: email,
    },
  });

  const siswa = await db.siswa.create({
    data: {
      id_user: user.id,
      email,
      ...dataSiswa,
    },
  });
  return res.json({ token: tokenForUser(user) });
};

// Api Get All Siswa
exports.AllSiswa = async (req, res, next) => {
  const { ...dataSiswa } = req.body;
  const siswa = await db.siswa.findMany({
    ...dataSiswa,
  });
  // use `console.dir` to print nested objects
  console.dir(siswa);
  return res.json(siswa);
};

//Api Get Siswa by ID
exports.idSiswa = async (req, res, next) => {
  const { id } = req.body;
  const siswa = await db.siswa.findFirst({
    where: {
      id: this.siswa.id,
    },
  });
  console.dir(siswa);
  return res.json(siswa);
};

exports.updateSiswa = async (req, res) => {
  const { id } = req.params;
  const dataSiswa = req.body;
  console.log(dataSiswa);
  try {
    const updateSiswa = await db.siswa.update({
      where: { id: parseInt(id) },
      data: { ...dataSiswa },
    });
    console.dir(updateSiswa);
    return res.json(updateSiswa);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "siswa tidak ada" });
  }
};

exports.deleteSiswa = async (req, res) => {
  const { id } = req.params;
  try {
    const deletesiswa = await db.siswa.delete({
      where: { id: id },
    });
    console.dir(deleteSiswa);
    return res.json(deleteSiswa);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "siswa tidak ada" });
  }
};
