const Prompt = require('../models/Prompt');

const createPrompt = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const prompt = await Prompt.create({
      title,
      content,
      category,
      tags,
      user: req.user._id
    });

    return res.status(201).json(prompt);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPrompts = async (req, res) => {
  try {
    const { category, favorite } = req.query;
    const filter = { user: req.user._id };

    if (category) filter.category = category;
    if (favorite === 'true') filter.favorite = true;

    const prompts = await Prompt.find(filter).sort({ createdAt: -1 });
    return res.json(prompts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchPrompts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const prompts = await Prompt.find({
      user: req.user._id,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    return res.json(prompts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ _id: req.params.id, user: req.user._id });

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    return res.json(prompt);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ _id: req.params.id, user: req.user._id });

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    const fields = ['title', 'content', 'category', 'tags', 'favorite'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) prompt[field] = req.body[field];
    });

    const updatedPrompt = await prompt.save();
    return res.json(updatedPrompt);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ _id: req.params.id, user: req.user._id });

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    prompt.favorite = !prompt.favorite;
    const updatedPrompt = await prompt.save();

    return res.json(updatedPrompt);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ _id: req.params.id, user: req.user._id });

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    await prompt.deleteOne();
    return res.json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPrompt,
  getPrompts,
  searchPrompts,
  getPromptById,
  updatePrompt,
  toggleFavorite,
  deletePrompt
};
