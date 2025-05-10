const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true],
    unique: true,
    trim: true,
    maxlength: [20],
  },

  secondName: {
    type: String,
    required: [true],
    unique: true,
    trim: true,
    maxlength: [20],
  },
  firstLastName: {
    type: String,
    required: [true],
    unique: true,
    trim: true,
    maxlength: [20],
  },
  secondLastName: {
    type: String,
    required: [true],
    unique: true,
    trim: true,
    maxlength: [20],
  },

  username: {
    type: String,
    required: [true, "Por favor ingrese un nombre de usuario"],
    unique: true,
    trim: true,
    maxlength: [20, "El nombre de usuario no puede exceder los 20 caracteres"],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese un email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor ingrese un email válido",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese una contraseña"],
    minlength: 6,
    select: false, // No se devuelve en las consultas
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encriptar contraseña antes de guardar
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generar token JWT
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Comparar contraseña ingresada con la almacenada
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
