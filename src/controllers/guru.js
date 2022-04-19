var jwt = require("jsonwebtoken");

const { secret } = require("../config");
const db = require("../db");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, secret);
}

// Api Create guru
exports.createGuru = async (req, res, next) => {
  const { username, password, ...dataGuru } = req.body;
  try {
    const user = await db.user.create({
      data: {
        username,
        password: username,
      },
    });

    const guru = await db.guru.create({
      data: {
        id_user: user.id,
        username,
        ...dataGuru,
      },
    });
    return res.json({ data: guru, token: tokenForUser(user) });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "cannot create siswa" });
  }
};

// Api Get All guru
exports.AllGuru = async (req, res, next) => {
  const query = req.query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 2;
  const last_page = req.query.last_page;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const result = {};
  const totalCount = await db.guru.count();
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
      result.paginateData = await db.guru.findMany({
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
      result.paginateData = await db.guru.findMany({
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
      result.paginateData = await db.guru.findMany({
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
      result.paginateData = await db.guru.findMany({
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

//Api Get guru by ID
// exports.idGuru = async (req, res, next) => {
//   const { id } = req.body;
//   try {
//     const result = await db.guru.findFirst({
//       where: { id: parseInt(id) },
//     });
//     console.dir(result);
//     return res.json(result);
//   } catch (error) {
//     return res.status(404).json(error);
//   }
// };
exports.idGuru = async (req, res, next) => {
  const { id } = req.params;
  const guru = await db.guru.findFirst({
    where: { id: parseInt(id) },
  });
  console.dir(guru);
  return res.json(guru);
};

exports.updateGuru = async (req, res) => {
  const { id } = req.params;
  const dataGuru = req.body;
  console.log(dataGuru);
  try {
    const result = await db.guru.update({
      where: { id: parseInt(id) },
      data: { ...dataGuru },
    });
    console.dir(result);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Guru tidak ada" });
  }
};

exports.deleteGuru = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.guru.delete({
      where: { id: id },
    });
    console.dir(result);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Guru tidak ada" });
  }
};
