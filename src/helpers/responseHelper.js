const success = (res, status, data) => {
    res.status(status).json({ result: data });
};

const error = (res, status, err) => {
    // const err = new Error(data);
    res.status(status).json({ err });
};

module.exports = {
    success,
    error,
};