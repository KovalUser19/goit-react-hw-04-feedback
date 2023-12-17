import { useState } from "react"
import { Statistics } from 'components/Statistics/Statistics';
import { Section } from "./Section/Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions"
import { Notification } from "./Notification/Notification";

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

 const countTotalFeedback = () => {
    return state.good + state.neutral + state.bad
  }

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    return totalFeedback === 0 ? 0 : Math.floor(state.good * 100 / countTotalFeedback())
}
 const isAnyChanges = () =>{
    return state.good !== 0 || state.neutral !== 0 || state.bad !== 0
}
 const handleFeedback = (key) => {
    setState((prev) => ({
       ...prev,
        [key]: prev[key] + 1
    }))
}
  return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions options={Object.keys(state)} onLeaveFeedback={handleFeedback} />
        </Section>
        <Section title="Statistics">
        {!isAnyChanges() && < Notification message="There is no feedback"></Notification>}
          {isAnyChanges() && <Statistics good={state.good} neutral={state.neutral} bad={state.bad}
            total={countTotalFeedback()} positivePercentage={countPositiveFeedbackPercentage()}></Statistics >}
        </Section>
      </>
    )
  }
