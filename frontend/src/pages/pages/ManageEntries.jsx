import TransactionsTable from "../../components/components/TransactionsTable";

function ManageEntries({ transactions }) {
  return (
    <div className="mt-6">
      <TransactionsTable transactions={transactions} />
    </div>
  );
}

export default ManageEntries;
