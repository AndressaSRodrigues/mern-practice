import { deleteQuiz, getQuizzesByUser } from "../../services/quizzes";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { QuizProps } from "../../interfaces/QuizProps";
import getThemeColor from "../../utils/themeColor";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

function DisplayQuizzesByUser() {
    const { token, username } = useAuth();
    const [quizzes, setQuizzes] = useState<QuizProps[]>([]);
    const [isPopOverOpen, setPopOverOpen] = useState<boolean>(false);
    const [quizToDelete, setQuizToDelete] = useState<string | undefined>(undefined);

    const fetchQuizzesByUser = async (token: string, username: string) => {
        try {
            const response = await getQuizzesByUser(token, username);
            setQuizzes(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchQuizzesByUser(token, username);
    }, [token, username]);


    const handleOpenPopOver = (quizId: string | undefined) => {
        setPopOverOpen(true);
        setQuizToDelete(quizId);
    };

    const handleClosePopOver = () => {
        setPopOverOpen(false);
        setQuizToDelete(undefined);
    };

    const handleDeleteQuiz = async (token: string, quizToDelete: string | undefined) => {
        try {
            await deleteQuiz(token, quizToDelete);
            fetchQuizzesByUser(token, username);
            setPopOverOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const popOverButtonsStyle = "bg-primary p-2 w-20 text-white rounded-md hover:bg-neutral-200 hover:border hover:border-primary hover:text-primary";

    return (
        <>
            {quizzes.map((quiz) => (
                <div
                    key={quiz._id}
                    className={`w-72 h-fit flex flex-col gap-2 p-2 rounded-md shadow-md ${getThemeColor(quiz.theme)}`}>
                    <span className={`${getThemeColor(quiz.theme)} p-2 rounded-md text-lg text-white font-bold`}>
                        {quiz.title}
                    </span>
                    <div className="flex flex-row items-center justify-between p-2 text-md text-neutral-400 rounded-md">
                        <Link to={`/take-quiz/${quiz._id}`}>
                            <VisibilityIcon /> View
                        </Link>
                        <span
                            className="cursor-pointer hover:text-primary"
                            onClick={() => handleOpenPopOver(quiz._id)}>
                            <DeleteForeverIcon /> Delete
                        </span>
                    </div>
                </div>
            ))}
            {isPopOverOpen && (
                <div className="absolute w-fit h-fit flex flex-col items-center p-6 rounded-md shadow-md">
                    <span className="text-lg text-primary">Do you want to delete this quiz?</span>
                    <div className="flex flex-row justify-around gap-4 mt-4">
                        <button
                            className={popOverButtonsStyle}
                            onClick={handleClosePopOver}>No</button>
                        <button
                            className={popOverButtonsStyle}
                            onClick={() => handleDeleteQuiz(token, quizToDelete)}>Yes!</button>
                    </div>

                </div>
            )}
        </>
    )
}

export default DisplayQuizzesByUser