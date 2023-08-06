import {useEffect, useState} from "react";
import SubAnswerImg from "../components/SubAnswerImg";
import SubQuestionsImg from "../components/SubQuestionsImg";
import Statistics from "../components/Statistics";

function Answer() {
    const [answer, setAnswer] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setAnswers([]);
    }, []);

    useEffect(() => {
        answers.push(answer);
    }, [answer]);

    return (
        <>
            <SubQuestionsImg setQuestions={setQuestions} />
            <SubAnswerImg setAnswer={setAnswer}/>

            <p>質問「{questions[0]}」への回答結果一覧</p>

            <div>
                    {
                        questions.map((data, index) => (
                            index !== 0 ?
                                <div key={index}>
                                    <h3>{data}</h3>
                                    {
                                        answers.map((item, i) => {
                                            return <p key = {i}>{item[index - 1]}</p>
                                        })
                                    }
                                </div>
                                : <p key={index}></p>
                        ))
                    }
            </div>

            <Statistics questions={questions} answers={answers}/>
        </>
    );
}

export default Answer;