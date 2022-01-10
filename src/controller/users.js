const usersModel = require("../models/users");
const responseHelper = require("../helpers/responseHelper");

const getDataUsers = (req, res) => {
  const { userInfo } = req;
  console.log("[DEBUG] userInfo", userInfo);
  usersModel
    .getDataUsers()
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getUserById = (req, res) => {
    const { params } = req;
    const id = params.id;
  usersModel
    .getUserById(id)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const deleteDataUsers = (req, res) => {
  const {
    body: { id },
  } = req;

  usersModel
    .deleteDataUsers(id)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "User has been deleted",
        id: result.insertId,
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const patchDataUsers = (req, res) => {
  const { body } = req;
  const { id } = req.userInfo;
  usersModel
    .patchDataUsers(body, id)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Data Updated",
        result: {
          ...body,
          url: req.file,
          id: result.insertId,
        },
      });
      // responseHelper(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

module.exports = {
  getDataUsers,
  getUserById,
  deleteDataUsers,
  patchDataUsers,
};
