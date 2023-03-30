const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category data exists!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id found!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  // Category.update(
  //   {
  //     // All the fields you can update and the data attached to the request body.
    
  //     category_name: req.body.category_name,
  //   },
  //   {
  //     // Gets the books based on the isbn given in the request parameters
  //     where: {
  //       id: req.params.id,
  //     },
  //   }
  // )
  //   .then((updatedCategory) => {
  //     // Sends the updated book as a json response
  //     res.json(updatedCategory);
  //   })
  //   .catch((err) => res.json(err));
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name,
  },
  {
    where:{
      id: req.params.id,
    }
  });
  if (!categoryData) {
    res.status(400).json({ message: 'Not a correct ID' })
    return;
  }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(400).json({ message: 'Not a correct ID' })
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
//   Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedCategory) => {
//       res.json(deletedCategory);
//     })
//     .catch((err) => res.json(err));

});

module.exports = router;
