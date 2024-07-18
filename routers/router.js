const Router = require("express");
const {addUser, login, update, deleteUser, showUsers} = require("../controllers/control");
const verifyToken = require("../middleware/middleware");
const router = Router();

router.post("/signIn",addUser);
router.post("/login",login);
router.patch("/edit/:id",update);
router.delete("/delete/:id",deleteUser);
router.get("/data",showUsers);

module.exports = router;