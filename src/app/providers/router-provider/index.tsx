import { BrowserRouter } from "react-router-dom";

import { Router } from "./RouterProvider";

export function RouterProvider() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
