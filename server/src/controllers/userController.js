import * as userService from '../services/userServices';
import { login } from '../services/authService';

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(req.query.searchString);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const importUsers = async (req, res) => {
  try {
    const users = await userService.importUsers(req.file);
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    console.log('logging in...')
    const token = await login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
