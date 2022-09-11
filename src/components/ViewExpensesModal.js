import { Button, Modal, Stack } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";

import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2" className="fs-5">
            <div>Earnings - {budget?.name}</div>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="2">
          {expenses.map((expense) => (
            <>
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-10">{expense.description}</div>
                <div className="fs-8">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  onClick={() => deleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
              <hr></hr>
            </>
          ))}
        </Stack>
        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
          <Button
            onClick={() => {
              deleteBudget(budget);
              handleClose();
            }}
            variant="outline-danger"
          >
            Delete
          </Button>
        )}
      </Modal.Body>
    </Modal>
  );
}
