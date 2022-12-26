import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import AppBar from './Components/AppBar';
import TransactionList from './Components/TransactionList';
import TransactionsForm from './Components/Transactions';

function App() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    fetchTransaction();
  }, [])


  const fetchTransaction = async () => {
    const res = await fetch('http://localhost:5000/transaction');
    const data = await res.json();
    setData(data)
  }
  return (
    <div className="App">
      <AppBar />
      <Container>
        <TransactionsForm setData={setData} editData={editData} fetchTransaction={fetchTransaction} setEditData={setEditData} />
        <TransactionList data={data} fetchTransaction={fetchTransaction} setEditData={setEditData} />
      </Container>
    </div>
  );
}

export default App;
