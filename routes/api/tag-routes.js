const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {

      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {

  try {

     // create a new tag
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // update a tag by its `id` value
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // conditional statement if specified tag is not found to return error 
    if (!tag) {
      res.status(404).json({ message: "No tag found with that id" });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
