const express = require("express");

const authenticate = require("../middleware/auth");

const {
  getBeneficiaries,
  createBeneficiary,
  deleteBeneficiary
} = require("../controllers/beneficiary.controller");

const router = express.Router();

router.get("/", authenticate, getBeneficiaries);
router.post("/", authenticate, createBeneficiary);
router.delete("/:id", authenticate, deleteBeneficiary);

module.exports = router;
