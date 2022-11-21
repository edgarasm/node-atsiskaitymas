module.exports = {
  validateRegistration: (req, res, next) => {
    const { username, pass1, pass2 } = req.body;

    if (username.length < 4)
      return res.send({
        error: true,
        message: 'username must be at least 4 characters long',
        data: null,
      });
    if (pass1 !== pass2)
      return res.send({ error: true, message: 'passwords do not match', data: null });
    if (pass1.length < 4 || pass1.length > 20)
      return res.send({
        error: true,
        message: 'password length should be between 4 and 20 characters',
        data: null,
      });

    next();
  },
};
