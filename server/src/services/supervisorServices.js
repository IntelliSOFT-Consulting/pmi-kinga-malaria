import Supervisor from "../models/supervisors";
import fs from "fs";
import XLSX from "xlsx";

export const createUser = async (user) => {
  try {
    const existing = await Supervisor.findOne({ phone: user.phone });
    if (existing) {
      throw new Error("Supervisor already exists");
    }
    const newUser = await Supervisor.create(user);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (searchString = "") => {
  try {
    const users = await Supervisor.find({
      name: { $regex: searchString, $options: "i" },
    }).sort({ name: 1 });
    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await Supervisor.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const updatedUser = await Supervisor.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedUser = await Supervisor.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

export const importUsers = async (file) => {
  try {
    const workbook = XLSX.readFile(file.path);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const users = XLSX.utils.sheet_to_json(sheet);

    const usersArray = users?.map((user) => {
      return {
        name: user["Name"],
        designation: user["Designation"],
        county: user["County"],
        subCounty: user["Sub County"],
        site: user["Operations Site"],
      };
    });

    const existingUsers = await Supervisor.find({ $or: usersArray.map(user => ({ name: user.name, county: user.county })) });
    const uniqueUsers = usersArray.filter(user => !existingUsers.some(existingUser => existingUser.name === user.name && existingUser.county === user.county));
    await Supervisor.insertMany(uniqueUsers, { ordered: false });

    await fs.unlinkSync(file.path);

    return users;
  } catch (error) {
    throw error;
  }
};
