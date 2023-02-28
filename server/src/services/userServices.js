import User from '../models/users';
import fs from 'fs';
import XLSX from 'xlsx';

const formatPhoneNumber = phone => {
  // TODO: if phone number starts with 0, remove it and add +254. if it starts with +254, return it as is. if it starts with 254 add + to it. If it start with 7 or 1, add +254 to it.
  switch (phone) {
    case phone.startsWith('0'):
      return phone.replace('0', '+254');
    case phone.startsWith('+254'):
      return phone;
    case phone.startsWith('254'):
      return '+' + phone;
    case phone.startsWith('7') || phone.startsWith('1'):
      return '+254' + phone;
    default:
      return phone;
  }
};

export const createUser = async user => {
  try {
    const existing = await User.findOne({ phone: user.phone });
    if (existing) {
      throw new Error('User already exists');
    }

    user.phone = formatPhoneNumber(user.phone);
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (searchString='') => {
  try {
    const users = await User.find({
      name: { $regex: searchString, $options: 'i' },
    }).sort({ name: 1 });
    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async id => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async id => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

export const importUsers = async file => {
  try {
    const workbook = XLSX.readFile(file.path);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const users = XLSX.utils.sheet_to_json(sheet);

    users.forEach(async function (user) {
      user.phone = formatPhoneNumber(user.phone);
      await User.create(user);
    });

    await fs.unlinkSync(file.path);

    return users;
  } catch (error) {
    throw error;
  }
};
