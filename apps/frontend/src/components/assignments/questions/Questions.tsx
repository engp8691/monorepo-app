import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'

type QuestionData = {
  title: string
  options: string[]
  answer: string
}

type QuestionProps = QuestionData & {
  setNextQuestion: Dispatch<SetStateAction<number>>
  setScore: Dispatch<SetStateAction<number>>
}

const questions: QuestionData[] = [
  {
    title: 'What is the capital of France?',
    options: ['Beijing', 'Boston', 'Paris', 'New York'],
    answer: 'Paris',
  },
  {
    title: 'What is the capital of China?',
    options: ['Beijing', 'Boston', 'Paris', 'New York'],
    answer: 'Beijing',
  },
]

export const Question: FC<QuestionProps> = ({
  title,
  options,
  answer,
  setNextQuestion,
  setScore,
}) => {
  const [choice, setChoice] = useState('')

  const handleRadioChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChoice(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (choice === answer) {
        setScore(prev => prev + 1)
      }
      setNextQuestion(prev => prev + 1)
    },
    [choice, answer, setNextQuestion, setScore]
  )

  useEffect(() => {
    setChoice('')
  }, [title])

  return (
    <form onSubmit={handleSubmit}>
      <fieldset key={title}> {/* One way to make sure the selection in previous question does not go here */}
        <legend><h2>{title}</h2></legend>
        {options.map(option => (
          <div key={title.concat(option)}>  {/* One way to make sure the selection in previous question does not go here */}
            <label>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={choice === option}  // One way to make sure the selection in previous question does not go here
                onChange={handleRadioChange}
              />
              {option}
            </label>
          </div>
        ))}
      </fieldset>
      <div style={{ marginTop: 16 }}>
        <button type="submit" disabled={!choice}>
          Submit
        </button>
      </div>
    </form>
  )
}

const ShowQuestion = () => {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  const isQuizOver = questionIndex >= questions.length

  return (
    <div style={{ padding: 20 }}>
      {isQuizOver ? (
        <h3>You got {score} out of {questions.length} correct</h3>
      ) : (
        <Question
          {...questions[questionIndex]}
          setNextQuestion={setQuestionIndex}
          setScore={setScore}
        />
      )}
    </div>
  )
}

export default ShowQuestion