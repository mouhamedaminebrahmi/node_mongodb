/**
 * @DESC Check Role Middleware
 */

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
exports.checkRole = (roles) => (req, res, next) => {
  let token = req.get("authorization");
  token = token.slice(7);
  const decodedJson = parseJwt(token);
  console.log(decodedJson.data.role);
  const userRole = decodedJson.data.role;
  if (roles.includes(userRole)) {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
    success: false,
  });
};
