import { Suspense } from "react";
import EvaluationList from "./EvaluationList";

const EvaluationPage = () => {
  return (
    <Suspense>
      <EvaluationList />
    </Suspense>
  );
};

export default EvaluationPage;
