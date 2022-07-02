const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  try {
    // find all tags
    const tags = await Tag.findAll({

      // be sure to include its associated Product data
      include: [
        { 
          model: Product, 
          through: ProductTag 
        }
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  
  try {
    // find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {

      // be sure to include its associated Product data
      include: [
        { 
          model: Product, 
          through: ProductTag 
        }
      ],
    });
    if (!tag) {
      res.status(404).json({ 
        message: "No tag found with this id!" 
      });

      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  
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
  
  try {
    const delTag = Tag.destroy({ 

      // delete on tag by its `id` value
      where: { 
        id: req.params.id 
      } 
    });
    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
