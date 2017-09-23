import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
 
  function fetchJSON(URL) {
    return fetch(URL).then(response => response.json())
      .catch(err => console.log('Error:', err));
  }

class DefaultPaginationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
     
    };
  }

 componentDidMount() {

      //fetch api data and set state     
      this.apiFetch = fetchJSON('https://api.github.com/repositories');
      this.apiFetch.then(user => this.setState({ user }));

    }


  render() {
  const user = this.state.user;
         
  
  //render linksin datatable
  function linkFormatter(cell, row) {
       const rowid = row.id;
        return (
      <a id={rowid} href={cell} target="_blank">{cell}</a>
    );
  }


    return ( 
        <BootstrapTable
          data={ user }
          pagination>
          <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' >Name</TableHeaderColumn>
          <TableHeaderColumn dataField='html_url' dataFormat={linkFormatter}>Github link</TableHeaderColumn>
          <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
        </BootstrapTable>

    );
  }
}

export default DefaultPaginationTable;