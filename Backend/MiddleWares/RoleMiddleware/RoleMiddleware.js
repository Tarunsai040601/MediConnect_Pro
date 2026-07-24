const roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.users.role)) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      next();
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({
        success: false,
        message: "Role middleware something went wrong",
        error_message: error.message,
      });
    }
  };
};

module.exports = roleMiddleware;