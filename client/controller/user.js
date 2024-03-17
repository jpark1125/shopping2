const shortid = require("shortid");
const util = require("../../utils");
const { U, A } = require("../prototype");
const user = new U();
const auth = new A();

module.exports = {
  CheckDuplicateNickname: async (req, res) => {
    try {
      let result = await user.DuplicateData("nickname", req.body.data);
      return res.status(200).send({ result: result });
    } catch (err) {
      return res.send({ error: err.toString() });
    }
  },

  CheckDuplicateEmail: async (req, res) => {
    try {
      let result = await user.DuplicateData("eamil", req.body.data);
      return res.status(200).send({ result: result });
    } catch (err) {
      return res.send({ error: err.toString() });
    }
  },
  SignUp: async (req, res) => {
    try {
      console.log(req.body);
      req.body.id = shortid.generate();
      const userType = req.body.userType;
      req.body.access_token = util.jwt.createToken({
        id: req.body.id,
        user_id: req.body.userid,
        user_type: userType,
      });
      req.body.refresh_token = util.jwt.createToken({
        id: req.body.id,
        user_type: userType,
      });
      await user.SignUp(user.UserBind(req.body, userType));
      return res.status(200).send({
        access_token: req.body.access_token,
        refresh_token: req.body.refresh_token,
      });
    } catch (error) {
      return res.send({ error: error.toString() });
    }
  },
  LogIn: async (req, res) => {
    try {
      let result = await user.LogIn(req.body);
      return res.status(200).send({ result: result });
    } catch (err) {
      return res.send({ error: err.toString() });
    }
  },
  IssuedToken: async (req, res) => {
    try {
      let decoded = auth.GetHeaderRefreshToken(req.headers);
      if (decoded.expired) {
        return decoded;
      }
      let result = await auth.IssuedToken({
        id: decoded.id,
        refresh_token: req.headers.refreshauthorization,
      });
      return res.status(200).send({ result: result });
    } catch (err) {
      return res.send({ error: err.toString() });
    }
  },
  AutoIssuedToken: async (req, res) => {
    try {
      let decoded = auth.GetHeaderRefreshToken(req.headers);
      console.log(decoded);
      if (decoded.expired) {
        return decoded;
      }
      let result = await auth.AutoIssuedToken({
        id: decoded.id,
        refresh_token: req.headers.refreshauthorization,
      });
      console.log("result :", result);
      return res.status(200).send({ result: result });
    } catch (err) {
      return res.send({ error: err });
    }
  },

  MyPage: async (req, res) => {
    try {
      let decoded = auth.GetHeaderToken(req.headers);
      if (decoded.expired) {
        return decoded;
      }
      const rows = await user.MyPage(decoded.id);
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(200).send({ error: error.toString() });
    }
  },

  UpdateMyPage: async (req, res) => {
    try {
      console.log(111);
      let decoded = auth.GetHeaderToken(req.headers);
      if (decoded.expired) {
        return decoded;
      }
      req.body.id = decoded.id;
      await user.UpdateMyPage(req.body);
      return res.status(200).send({ result: "success" });
    } catch (error) {
      return res.status(200).send({ error: error.toString() });
    }
  },
};
