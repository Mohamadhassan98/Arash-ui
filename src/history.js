import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
class History extends Component {

    render() {
        return (
<React.Fragment>
      <Title>History</Title>
      <Table size="small">
        <TableHead>
          <TableRow className="tablehead">
            <TableCell className="tablecell">Date</TableCell>
            <TableCell className="tablecell">Operation</TableCell>
            <TableCell className="tablecell">Operand</TableCell>
            <TableCell className="tablecell">Details</TableCell>
            <TableCell className="tablecell" align="right">Object</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow className="tablehead">
              <TableCell className="tablecell">2019-01-11</TableCell>
              <TableCell className="tablecell">Add</TableCell>
              <TableCell className="tablecell">Arash</TableCell>
              <TableCell className="tablecell">An arash with these details was added!</TableCell>
              <TableCell className="tablecell" align="right">Click here.</TableCell>
            </TableRow>
            <TableRow className="tablehead">
              <TableCell className="tablecell">2019-01-11</TableCell>
              <TableCell className="tablecell">Add</TableCell>
              <TableCell className="tablecell">Arash</TableCell>
              <TableCell className="tablecell">An arash with these details was added!</TableCell>
              <TableCell className="tablecell" align="right">Click here.</TableCell>
            </TableRow>
        </TableBody>
      </Table>

    </React.Fragment>
        );
    }
}

export default History;



// WEBPACK FOOTER //
// ./src/pages/SignInForm.js
