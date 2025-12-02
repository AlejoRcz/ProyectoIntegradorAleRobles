const jwt = require("jsonwebtoken");
const User = require("../models/usuario");

// Register
const register = async (req, res) => {
  try {
    const { username, email, password, name, role } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Faltan campos por llenar" });

    const existing = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existing)
      return res.status(400).json({ message: "Usuario ya existente" });

    
    const newUser = new User({
      username,
      email,
      name,
      passwordHash: password,
      role: role || "user"
    });

    await newUser.save();

    res.json({ message: "Usuario registrado exitosamente" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });

    if (!user)
      return res.status(400).json({ message: "Datos inválidos" });

    
    if (password !== user.passwordHash)
      return res.status(400).json({ message: "Datos inválidos" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };