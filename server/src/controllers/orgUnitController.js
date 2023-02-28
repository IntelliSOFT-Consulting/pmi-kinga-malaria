import * as OrgUnitService from '../services/orgUnitService';

export const getAllOrgUnits = async (req, res) => {
  try {
    const orgUnits = await OrgUnitService.getAllOrgUnits(req.query);
    return res.status(200).send(orgUnits);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getOrgUnitById = async (req, res) => {
  try {
    const orgUnit = await OrgUnitService.getOrgUnitById(req.params.id);
    return res.status(200).send(orgUnit);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const createOrgUnit = async (req, res) => {
  try {
    const orgUnit = await OrgUnitService.createOrgUnit(req.body);
    return res.status(201).send(orgUnit);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const updateOrgUnit = async (req, res) => {
  try {
    const orgUnit = await OrgUnitService.updateOrgUnit(req.params.id, req.body);
    return res.status(200).send(orgUnit);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const deleteOrgUnit = async (req, res) => {
  try {
    const orgUnit = await OrgUnitService.deleteOrgUnit(req.params.id);
    return res.status(200).send(orgUnit);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const importOrgUnits = async (req, res) => {
  try {
    const orgUnits = await OrgUnitService.importOrgUnits(req.file);
    return res.status(200).send(orgUnits);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
