const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const checkRole = (roles) => (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const userType = decoded.user_type;

    if (roles.includes(userType)) {
      next();
    } else {
      return res.status(403).json({ message: "접근 권한이 없습니다." });
    }
  } catch (error) {
    return res.status(401).json({ message: "인증 실패" });
  }
};

// 라우트에서 미들웨어 사용 예시
//app.post("/some-protected-route", checkRole(["seller"]), (req, res) => {
