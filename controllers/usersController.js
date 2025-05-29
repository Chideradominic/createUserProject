const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");
const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 to 10 characters.";
const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("age")
    .trim()
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be a number between 0 and 120."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("bio")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Bio must be at most 200 characters long."),
];
exports.usersListGet = (req, res) => {
  res.render("index", { title: "User List", users: usersStorage.getUsers() });
};
exports.usersCreateGet = (req, res) => {
  res.render("createUser", { title: "Create User" });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, age, email, bio } = req.body;
    usersStorage.addUser({
      firstName,
      lastName,
      age,
      email,
      bio,
    });

    res.redirect("/");
  },
];
exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", { title: "Update User", user: user });
};
exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update User",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, age, email, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      age,
      email,
      bio,
    });
    res.redirect("/");
  },
];
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};
exports.usersSearchGet = (req, res) => {
  const searchTerm = req.query.search;
  const users = usersStorage
    .getUsers()
    .filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
    );
  console.log(users);
  console.log(searchTerm);
  res.render("search", { title: "User List", users: users });
};
