var jwt = require("jsonwebtoken");

const { secret } = require("../config");
const db = require("../db");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, secret);
}

// Create Siswa
exports.createSiswa = async (req, res, next) => {
  const { username, password, ...dataSiswa } = req.body;
  try {
    // const user = await db.user.create({
    //   data: {
    //     username,
    //     password: username,
    //   },
    // });
    const siswa = await db.siswa.create({
      data: {
        username,
        ...dataSiswa,
        User:{
          create:{
            username,
            password:username,
          }
        },
        Kelas:{
          create:{
            nama:'test',
            grade:"test",
            jurusan:"test",
            tahun_ajaran :"test",
          }
        }
      },
    });

    console.log(siswa)
    return res.json({ data: siswa});
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "cannot create siswa" });
  }
};

// Get All Siswa
exports.AllSiswa = async (req, res, next) => {
  const query = req.query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 1000;
  const last_page = req.query.last_page;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const result = {};
  const totalCount = await db.siswa.count();
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;
  try {
    if (page < 0) {
      return res.status(400).json("Page value should not be negative");
    } else if (page === 1 && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.next = {
        page: page + 1,
        limit: limit,
      };
      result.paginateData = await db.siswa.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.paginateData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (endIndex < totalCount && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.next = {
        page: page + 1,
        limit: limit,
      };
      result.paginateData = await db.siswa.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.paginateData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (startIndex > 0 && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.previous = {
        page: page - 1,
        limit: limit,
      };
      result.paginateData = await db.siswa.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.paginateData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (last_page === "true" && page === totalPage) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = totalPage;
      result.last = {
        page: totalPage,
        limit: limit,
      };
      result.paginateData = await db.siswa.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.paginateData).length;
      result.range = totalCount;
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (err) {
    console.error("error", err);
    return res.status(500).json(err);
  }
};

//Get Siswa by ID
exports.idSiswa = async (req, res, next) => {
  const { id } = req.params;
  const siswa = await db.siswa.findFirst({
    where: { id: parseInt(id) },
  });
  console.dir(siswa);
  return res.json(siswa);
};

// Update Siswa
exports.updateSiswa = async (req, res) => {
  const { id } = req.params;
  const dataSiswa = req.body;
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

// Delete Siswa
exports.deleteSiswa = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.siswa.delete({
      where: { id: parseInt(id) },
    });
    console.dir(result);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "cannot delete siswa" });
  }
};
