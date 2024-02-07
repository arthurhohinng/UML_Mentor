import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    // loader: rootLoader
    // loaders are used to prefetch data to be used for a route

    // children: [
    //   {
    //     path: "team",
    //     loader: teamLoader,
    //     element: <Team />,
    //   },
    // ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
