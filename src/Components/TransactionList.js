import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete'; import { IconButton, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import dayjs from 'dayjs';


export default function TransactionList({ data, fetchTransaction, setEditData }) {
    const remove = async (id) => {
        if (window.confirm('Are you sure to delete this transaction???')) {
            await fetch(`http://localhost:5000/transaction/${id}`, {
                method: "DELETE",
            });
            fetchTransaction();
        }
    }
    return (
        <>
            <Typography sx={{ marginTop: 10 }} variant={'h6'}>List of Transaction</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.amount}</TableCell>
                                <TableCell align="center">{row.details}</TableCell>
                                <TableCell align="center">{dayjs(row.date).format('DD MMM, YYYY')}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => setEditData(row)}>
                                        <ModeEditIcon />
                                    </IconButton>
                                    <IconButton color="warning" onClick={() => remove(row._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}