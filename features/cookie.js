const jwt= require('jsonwebtoken')

const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id },"fefesfeergergewfew");
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite:  "none",
      secure:  true,
    })
    .json({
      status: true,
      message,
    });
};

module.exports=sendCookie