const db = require("../models/index");
const { use } = require("../routes/ChallengeRoutes");
const Challenge = db.Challenge;

function diffToNum(difficulty) {
  switch (difficulty) {
    case "easy":
      return 0;
    case "medium":
      return 1;
    case "hard":
      return 2;
    default:
      return -1;
  }
}

/**
 * Extracts the challenge description from the challengeData object
 * Add the completion status based on whether the user has solved the challenge
 * @param {*} challengeData 
 * @returns 
 */
async function formatChallenge(challengeData, userId) {
  const challengeDescription = JSON.parse(challengeData.description);
  // fetch the user's solutions
  const challengeSolutions = await db.Solution.findAll(
    { where: { 
        challengeId: challengeData.id, 
        userId: userId
      } 
    });    

    // check if the user has solved the challenge
    if (challengeSolutions.length > 0) {
      return {
        id: challengeData.id,
        title: challengeData.title,
        difficulty: diffToNum(challengeData.difficulty),
        outcome: challengeDescription.outcome,
        keyPatterns: challengeDescription.keyPatterns,
        generalDescription: challengeDescription.generalDescription,
        usageScenarios: challengeDescription.usageScenarios,
        expectedFunctionality: challengeDescription.expectedFunctionality,
        completed: true,
      }
    } else {
      return {
        id: challengeData.id,
        title: challengeData.title,
        difficulty: diffToNum(challengeData.difficulty),
        outcome: challengeDescription.outcome,
        keyPatterns: challengeDescription.keyPatterns,
        generalDescription: challengeDescription.generalDescription,
        usageScenarios: challengeDescription.usageScenarios,
        expectedFunctionality: challengeDescription.expectedFunctionality,
        completed: false,
      }
    }
  }
    

exports.findSuggested = async (req, res) => {
  const username = req.user.username;
  // see how many solutions the user has solved
  const userSolutions = await db.Solution.findAll({ 
    where: {
      userId: username,
    },
  });

  const userLevel = userSolutions.length;
  let challenges = [];

  if (userLevel < 6) {
    // return easy challenges
    challenges = await Challenge.findAll({
      order: db.sequelize.random(),
      where: {
        difficulty: "easy",
      },
    });
  } else if (userLevel < 15) {
    // get medium challenges
    challenges = await Challenge.findAll({
      order: db.sequelize.random(),
      limit: 3,
      where: {
        difficulty: "medium",
      },
    });
  } else {
    // get hard challenges
    challenges = await Challenge.findAll({
      order: db.sequelize.random(),
      limit: 3,
      where: {
        difficulty: "hard",
      },
    });
  }
  
  // make sure none of the challenges are already solved by the user
  const unsolvedChallenges = challenges.filter((challenge) => {
    return !userSolutions.some((solution) => solution.challengeId === challenge.id);
  });

  // take the first 3 challenges and format them
  const formattedChallenges = await Promise.all(unsolvedChallenges.slice(0, 3).map(async (challenge) => 
    { return await formatChallenge(challenge, username)} ));

  return res.status(200).json(formattedChallenges);
}


exports.findAll = async (req, res) => {
  const challengesData = await Challenge.findAll();

  if(challengesData.length === 0) {
    return res.status(404).json({ error: "No challenges found." });
  }

  const challenges = await Promise.all(challengesData.map(async (challenge) => 
    { return await formatChallenge(challenge, req.user.username) }));

  res.status(200).json(challenges);
};

exports.findOne = async (req, res) => {
  // TODO: Check the Solutions table for if the user has already solved the challenge
  // Append `completed: true` to the challenge object if they have
  const challenge_id = req.params.id;

  const challengeData = await Challenge.findOne({
    where: {
      id: challenge_id,
    },
  });

  const challenge = await formatChallenge(challengeData, req.user.username);

  res.status(200).json(challenge);
};

exports.getSolutions = async (req, res) => {
  const id = req.body;
  const solutions = await axios.get(id);
  res.status(200).json(solutions.data);

  res.status(500).json({ error: error.message });
};

exports.create = async (req, res) => {
  const { description, title } = req.body;
  const newChallenge = await Challenge.create({ description, title });
  res.status(201).json(newChallenge);

  res.status(500).json({ error: error.message });
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const { description, title } = req.body;
  await Challenge.update({ description, title }, { where: { id } });
  const updatedChallenge = await Challenge.findByPk(id);
  res.status(200).json(updatedChallenge);

  res.status(500).json({ error: error.message });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Challenge.destroy({ where: { id } });
  res.status(204).send();

  res.status(500).json({ error: error.message });
};
