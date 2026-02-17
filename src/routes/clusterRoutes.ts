import express from "express";
import { createCluster, findCluster, getClusters, updateOnlinePeopleCount } from "../controllers/clusterController";

const router = express.Router();

router.get('/', getClusters);
router.get('/find', findCluster);
router.post('/create', createCluster);
router.patch('/update', updateOnlinePeopleCount);

export default router;