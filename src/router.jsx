import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Scholar from './pages/Scholar';
import Join from './pages/Join';
import Fields from './pages/Fields';
import Explore from './pages/Explore';
import ToolDetail from './pages/ToolDetail';
import Papers from './pages/Papers';
import Registry from './pages/Registry';
import Cohorts from './pages/Cohorts';
import CohortDetail from './pages/CohortDetail';
import About from './pages/About';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/scholar', element: <Scholar /> },
  { path: '/join', element: <Join /> },
  { path: '/fields', element: <Fields /> },
  { path: '/explore', element: <Explore /> },
  { path: '/explore/:toolId', element: <ToolDetail /> },
  { path: '/papers', element: <Papers /> },
  { path: '/registry', element: <Registry /> },
  { path: '/cohorts', element: <Cohorts /> },
  { path: '/cohorts/:cohortId', element: <CohortDetail /> },
  { path: '/about', element: <About /> },
]);

export default router;
