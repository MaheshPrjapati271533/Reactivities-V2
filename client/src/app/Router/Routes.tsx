import { createBrowserRouter } from "react-router"
import App from "../layout/App"
import HomePage from "../../features/Home/HomePage"
import ActivityDashboard from "../../features/Dashboard/ActivityDashboard"
import ActivityForm from "../../features/activities/form/ActivityForm"
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage"
import Counter from "../../features/Counter/Counter"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetailsPage /> },
            { path: 'createActivity', element: <ActivityForm key="craete" /> },
            { path: 'manage/:id', element: <ActivityForm /> },
            { path: 'counter', element: <Counter /> }
        ]
    }
]) 