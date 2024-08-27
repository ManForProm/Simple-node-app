export const asyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((next) =>
      res.status(500).json({ massageError: next.stack })
    );
  };
};
