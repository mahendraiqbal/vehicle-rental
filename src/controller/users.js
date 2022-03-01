const usersModel = require("../models/users");
const responseHelper = require("../helpers/responseHelper");

const getDataUsers = (req, res) => {
  const { id } = req.userInfo;
  console.log("[DEBUG] userInfo", id);
  usersModel
    .getDataUsers(id)
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
  // console.log('body', body);
  // console.log(req.file.filename)
  // const saveImage = {...body, image: req.file.filename}
  let saveImage;

  console.log(req.file)

  if (req.file) {
    saveImage = {
      ...body,
      image : req.file.filename,
    };
  } else {
    saveImage = {...body}
  }

  usersModel
    .patchDataUsers(saveImage, id)
    .then(({ status }) => {
      res.status(status).json({
        msg: "Data Updated",
        result: {
          ...saveImage,
        },
      });
      // responseHelper(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const patchPasswordUsers = (req,res) => {
  const { body } = req;
  const { id } = req.userInfo;

  usersModel
  .patchPasswordUsers(body, id)
  .then(({ status }) => {
    responseHelper.success(res, status, {
      msg: "Password Updated",
      id,
    });
  })
  .catch(({ status, err }) => {
    if (status == 401)
    return responseHelper.error(res, status, "Password invalid");
    responseHelper.error(res, status, err);
  });
};

module.exports = {
  getDataUsers,
  getUserById,
  deleteDataUsers,
  patchDataUsers,
  patchPasswordUsers,
};
