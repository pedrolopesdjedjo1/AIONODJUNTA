function validate(schema) {
  return (req, res, next) => {
    try {
      const result = schema(req.body);

      if (result !== true) {
        return res.status(400).json({
          success: false,
          message:
            typeof result === "string"
              ? result
              : "Dados inválidos."
        });
      }

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Erro na validação dos dados."
      });
    }
  };
}

module.exports = validate;
