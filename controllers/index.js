// only importing the necessary routes
import { Router } from 'express'
import { homeRoutes }  from './homeRoutes'
import { apiIndex } from './api'

export const routes = Router();

routes.use('/', homeRoutes);
routes.use('/api', apiIndex);