import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper,
    Checkbox,
    FormControlLabel,
    Switch,
    Button,
    Grid,
    Card,
    Typography,
    CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'age',
        numeric: true,
        disablePadding: false,
        label: 'Age',
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: false,
        label: 'Present Address',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'mobileNumber',
        numeric: false,
        disablePadding: false,
        label: 'Contact Number',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } =
        props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.id === 'id' || 'name' ? 'left' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
                {numSelected > 0 ? null :
                    < TableCell align='center'>
                        Action
                    </TableCell>
                }
            </TableRow>
        </TableHead >
    );
}

function Main() {
    let navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataCollection, setDataCollection] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        const q = query(collection(db, "dataCollection"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setDataCollection(data)
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        });
        return unsubscribe
    }, []);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = dataCollection.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataCollection.length) : 0;

    const visibleRows = useMemo(
        () =>
            dataCollection.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, dataCollection],
    );
    const handleDelete = async ({ selected }) => {
        console.log(selected);
        if (window.confirm("Are you sure you want to DELETE?")) {
            selected.forEach((id) => { deleteDoc(doc(db, "dataCollection", `${id}`)); })
        }
        setSelected([])
    };
    if (isLoading === true) {
        return (
            <Box style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
                <CircularProgress color="secondary" size={100} />
            </Box>
        )
    } else {
        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ padding: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', padding: 2, mt: 5 }}>
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: selected.length > 0 ? 'space-between' : 'flex-end', width: '300px' }}>
                            {selected.length > 0 ?
                                < Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete({ selected })}>
                                    Delete
                                </Button> : null
                            }
                            <Button variant='contained' onClick={() => navigate('/create')}>Create New Data</Button>
                        </Box>
                    </Box>
                    <Paper sx={{ width: '100%', mb: 2, border: 1 }}>
                        < TableContainer >
                            <Table
                                sx={{ minWidth: 1280 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={dataCollection.length}
                                />
                                <TableBody>
                                    {dataCollection && visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}

                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    id={labelId}
                                                    scope="row"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell
                                                    scope="row"
                                                >
                                                    {row.data.firstname + " " + row.data.middlename + " " + row.data.lastname}
                                                </TableCell>
                                                <TableCell align="left">{row.data.age}</TableCell>
                                                <TableCell align="left">{row.data.address}</TableCell>
                                                <TableCell align="left">{row.data.email}</TableCell>
                                                <TableCell align="left">{row.data.mobileNumber}</TableCell>
                                                {selected.length > 0 ? null :
                                                    <TableCell align="center">
                                                        <Button variant="contained" size={dense ? 'small' : 'medium'} onClick={() => navigate(`/view/${row.id}/${row.data.firstname}`)} sx={{ marginX: 1 }}>Veiw</Button>
                                                        <Button variant="contained" size={dense ? 'small' : 'medium'} onClick={() => navigate(`/edit/${row.id}/${row.data.firstname}`)} sx={{ marginX: 1 }}>Edit</Button>
                                                    </TableCell>
                                                }
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={dataCollection.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </Box >
        );
    }
}
export default Main