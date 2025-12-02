const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },

  role: { type: String, enum: ["admin", "chef", "user"], default: "user" },
  profileImage: {
        type: String, // URL de imagen
        default: ""
  },
  country: {
        type: String,
        default: ""
  },
  bio: {
        type: String,
        default: ""
  },
  interests: {
        type: String,
        default: ""
  },
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Receta" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
},
{
    timestamps: true
});

module.exports = mongoose.model("Usuario", userSchema);