import {createBrowserRouter} from "react-router-dom";
import Demo from "./components/Demo";
import Answer from "./pages/Answer";
import Question from "./pages/Question";

const App = createBrowserRouter([
    {
        element: <Demo />,
        children: [
            { path: "answer", element: <Answer /> },
            { path: "question", element: <Question />}
        ],
    },
])

export default App;