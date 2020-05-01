const Profile = require("../models/Profile");
const profileController = {};

profileController.getCurrentUser = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(200).json({
        error: true,
        message: "No profile found",
      });
    }

    return res.status(200).json({
      error: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};

profileController.updateProfile = async (req, res) => {
  try {
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    let profileObj = {};

    profileObj.user = req.user.id;
    if (company) profileObj.company = company;
    if (location) profileObj.location = location;
    if (website) profileObj.website = website;
    if (bio) profileObj.bio = bio;
    if (skills) profileObj.skills = skills;
    if (status) profileObj.status = status;
    if (githubusername) profileObj.githubusername = githubusername;

    profileObj.social = {};

    if (youtube) profileObj.social.youtube = youtube;
    if (twitter) profileObj.social.twitter = twitter;

    if (instagram) profileObj.social.instagram = instagram;

    if (linkedin) profileObj.social.linkedin = linkedin;

    if (facebook) profileObj.social.facebook = facebook;

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileObj },
        { new: true, upsert: true }
      );
      return res.status(200).json({
        error: true,
        message: "Profile Updated",
      });
    } else {
      profile = new Profile(profileObj);
      await profile.save();

      return res.status(200).json({
        error: true,
        message: "Profile Updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};

profileController.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    return res.status(200).json({
      error: false,
      data: profiles,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};

profileController.getProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findOne({ user: id }).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile) {
      return res.status(200).json({
        error: false,
        message: "No profile for this ID",
      });
    }

    return res.status(200).json({
      error: false,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};

profileController.deleteUserAndProfile = async (req, res) => {
  try {
    // Todo : Remove Posts
    await Profile.findOneAndRemove({ user: req.user.id });
    await user.findOneAndRemove({ _id: req.use.id });

    return res.status(200).json({
      error: false,
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};

profileController.addExperience = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExp);

    await profile.save();

    return res.status(200).json({
      error: false,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};

profileController.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    let filtered = profile.experience.filter((exp) => exp.id !== req.params.id);

    profile.experience = filtered;

    await profile.save();

    return res.status(200).json({
      error: false,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};

profileController.addEducation = async (req, res) => {
  try {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newExp);

    await profile.save();

    return res.status(200).json({
      error: false,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};


profileController.deleteEducation = async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
  
      let filtered = profile.education.filter((exp) => exp.id !== req.params.id);
  
      profile.education = filtered;
  
      await profile.save();
  
      return res.status(200).json({
        error: false,
        data: profile,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.stack,
      });
    }
  };

module.exports = profileController;
