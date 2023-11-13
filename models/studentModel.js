const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  location: { type: String },
  contactNumber: { type: String },
  cin: { type: String, required: true, unique: true },
  university: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Méthode pour hacher le mot de passe avant de sauvegarder l'étudiant
studentSchema.pre("save", async function (next) {
  const student = this;
  if (student.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);
  }
  next();
});

// Méthode pour comparer les mots de passe
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
