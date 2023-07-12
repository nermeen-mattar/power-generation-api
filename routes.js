/**
 * @swagger
 * tags:
 *   name: Plants
 *   description: API endpoints for managing power plants
 */

const express = require('express');
const router = express.Router();
const { uploadData, getAllPlants, getPlantsByState, getTopPlants } = require('./controller');

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload data to the database
 *     tags: 
 *       - Plants
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your request body properties here
 *     responses:
 *       200:
 *         description: Data uploaded successfully
 *       500:
 *         description: Failed to upload data to the database
 */

router.post('/upload', uploadData);

/**
 * @swagger
 * /plants:
 *   get:
 *     summary: Get all plants
 *     tags: 
 *       - Plants
 *     responses:
 *       200:
 *         description: Successfully retrieved plants
 *       500:
 *         description: Failed to fetch plants from the database
 */
router.get('/plants', getAllPlants);

/**
 * @swagger
 * /plants/state/{state}:
 *   get:
 *     summary: Get plants by state
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: State to filter plants by
 *     responses:
 *       200:
 *         description: Returns an array of plants filtered by state
 *       404:
 *         description: No plants found for the specified state
 */
router.get('/plants/state/:state', getPlantsByState);

/**
 * @swagger
 * /plants/top:
 *   get:
 *     summary: Get top N plants based on net generation
 *     tags: [Plants]
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of plants to retrieve (top N)
 *     responses:
 *       200:
 *         description: Successfully retrieved top N plants based on net generation
 *       500:
 *         description: Failed to fetch top plants from the database
 */
router.get('/plants/top', getTopPlants);


module.exports = router;
