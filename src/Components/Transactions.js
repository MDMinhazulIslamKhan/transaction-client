import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';


export default function TransactionsForm({ fetchTransaction, editData, setEditData }) {
    const [form, setForm] = useState({ amount: 0, details: '', date: new Date() });

    useEffect(() => {
        if (editData) {
            setForm(editData);
        }

    }, [editData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        editData ? await update(e) : post();
        setForm({ amount: 0, details: '' });
        setEditData(null)
        fetchTransaction();
    };

    const update = async () => {
        await fetch(`http://localhost:5000/transaction/${editData._id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const post = async () => {
        await fetch('http://localhost:5000/transaction', {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };


    return (
        <Card sx={{ minWidth: 275, marginTop: 10 }}>
            <CardContent>
                <Typography variant="h6">{editData ? 'Update transaction' : 'Add new transaction'}</Typography>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <TextField sx={{ marginRight: 3, marginTop: 2 }} size="small" value={form.amount} type="number" onChange={e => setForm({ ...form, amount: e.target.value })} id="outlined-basic" label="Amount" variant="outlined" />
                    <TextField sx={{ marginRight: 3, marginTop: 2 }} size="small" value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} id="outli  ned-basic" label="Description" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Transactions Date"
                            inputFormat="MM/DD/YYYY"
                            value={form.date} onChange={e => setForm({ ...form, date: e })}
                            renderInput={(params) => <TextField sx={{ marginRight: 3, marginTop: 2 }} size="small" {...params} />}
                        />
                    </LocalizationProvider>
                    {
                        editData ?
                            <Button type='submit' sx={{ marginRight: 3, marginTop: 2 }} variant="contained">Update</Button> :
                            <Button type='submit' sx={{ marginRight: 3, marginTop: 2 }} variant="contained">Submit</Button>
                    }
                </form>
            </CardContent>
        </Card>
    );
}