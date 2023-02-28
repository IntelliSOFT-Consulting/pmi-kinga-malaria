import { deepFlattenArray } from '../lib/utils.js';
import * as formService from '../services/formsService.js';
import { getSubmissions, supervisoryReport } from '../services/reportService.js';

export const getForms = async (req, res) => {
  const { isTest } = req.query;
  const token = req.token;
  try {
    const forms = await formService.getForms(isTest, token);
    res.send(forms);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getForm = async (req, res) => {
  const { isTest, formId } = req.query;
  const token = req.token;
  try {
    const form = await formService.getForm(isTest, token, formId);
    res.send(form);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getFormSubmissions = async (req, res) => {
  const { isTest='no', formId, from, to } = req.query;
  const token = req.token;
  try {
    const form = await formService.getFormSubmissions(
      isTest,
      token,
      formId,
      from,
      to
    );
    res.send(form);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getFormJson = async (req, res) => {
  const { isTest = 'no', from = new Date(), to = new Date() } = req.query;
  const token = req.token;
  try {
    const report = await supervisoryReport(isTest, token, from, to);
    res.send(deepFlattenArray(report));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const submissionByForm = async (req, res) => {
  const { isTest='no', from = new Date(), to = new Date() } = req.query;
  const token = req.token;
  try {
    const report = await getSubmissions(isTest, token, from, to);
    res.send(report);
  } catch (error) {
    console.log(error);
    res.status(500).send;
  }
};
