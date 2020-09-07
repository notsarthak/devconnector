const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const request = require("request");
const { githubClientID, githubSecret } = require("../../config/keys.js");
const auth = require("./../../middleware/auth");
const Profile = require("./../../models/Profile");
const User = require("./../../models/User");

//@route Get /api/profile/me
//@access Private
//@desc Get current users profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).send("The is no profile for this user");
    }
    res.json(profile); //to send json data back to the user we use res.json()
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

//@route Post /api/Profile
//@access Private
//@@desc Create or update current users Profile
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
      check("handle", "You must provide a unique handle for your profile!")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      handle,
      company,
      bio,
      status,
      githubusername,
      website,
      location,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    if (status === "0")
      return res
        .status(400)
        .json({ errors: [{ msg: "Status is required", param: "status" }] });
    let profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        if ( (profile.handle !== handle) && ((await Profile.find({ handle: handle })).length !== 0) ) {
          return res.status(400).json({
            errors: [
              { msg: "This handle-name is already in use!", param: "handle" },
            ],
          });
        }
        profileFields.experience = profile.experience;
        profileFields.education = profile.education;
        profile.overwrite(profileFields);
        await profile.save();
        return res.json(profile);
      }
      const profilesWithSameHandle = await Profile.find({ handle: handle });
      if (profilesWithSameHandle.length !== 0) {
        return res.status(400).json({
          errors: [
            { msg: "This handle-name is already in use!", param: "handle" },
          ],
        });
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET /api/Profile
//@access Public
//@@desc Get all Profiles
router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route Get /api/profile/user/:user_id
//@access Public
//@desc Get user's profile by user's id
router.get("/user/:user_id", async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      return res.status(400).send({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route Get /api/profile/handle/:handle
//@access Public
//@desc Get user's profile by user's handle
router.get("/handle/:handle", async (req, res) => {
  try {
    let profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ errors: [{msg: "Profile not found", param: "account"}] });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      return res.status(400).send({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route Delete /api/profile
//@desc Delete profile, user, posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        errors: [{ msg: "User does not exist!" }],
      });
    }
    res.status(500).send("Server Error");
  }
});

//@route Put /api/profile/experience
//@desc Add experience to profile
//access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      from,
      to,
      current,
      company,
      location,
      description,
    } = req.body;
    const newExp = { title, from, to, current, location, company, description };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route Delete /api/profile/experience/:exp_id
//@access Private
//@desc Delete experience from a profile
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get Remove Index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    //console.log(removeIndex)
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Put /api/profile/education
//@desc Add education to profile
//access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      from,
      to,
      current,
      degree,
      location,
      description,
      fieldofstudy,
    } = req.body;
    const newEdu = {
      school,
      fieldofstudy,
      from,
      to,
      current,
      location,
      degree,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route Delete /api/profile/education/:edu_id
//@access Private
//@desc Delete education from a profile
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get Remove Index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    //console.log(removeIndex)
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Get /api/profile/github/:username
//@desc Get github repositories of user
//@access Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${
        githubClientID
      }&client_secret=${githubSecret}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
