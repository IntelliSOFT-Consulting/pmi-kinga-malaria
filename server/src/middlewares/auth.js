export const authenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('No authorization headers');
    }
    req.token = req.headers.authorization;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};
