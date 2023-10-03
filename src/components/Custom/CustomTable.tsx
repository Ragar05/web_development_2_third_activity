import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidV4 } from 'uuid';
import { FunctionComponent } from 'react';

type Props = {
    columns: { row: string, title: string, format?: (value: string | number | boolean | any[] | null) => string }[];
    rows: { [key: string]: string | number | boolean | any[] | null, id: string }[];
    actions?: { icon: FunctionComponent<{ onClick: () => void }>, method: (id: string) => void }[],
};

export const CustomTable = ({ columns, rows, actions = [] }: Props) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: 10, height: 600 }}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column, index) => (
                                <TableCell align="right" key={index + 1}>{column.title}</TableCell>
                            ))
                        }
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 && rows.map((row) => {
                        return (
                            <TableRow
                                key={uuidV4()}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {
                                    columns.map(column => (
                                        <TableCell align="right" key={uuidV4()}>{
                                            column?.format ?
                                                column.format(row[column.row]) :
                                                row[column.row]
                                        }</TableCell>
                                    ))
                                }
                                {
                                    actions.map(({ icon: Icon, method }) => {
                                        return (
                                            <TableCell align="right" key={uuidV4()}>
                                                <Icon onClick={() => method(row.id)} />
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}