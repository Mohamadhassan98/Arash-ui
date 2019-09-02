import React, {Component, forwardRef} from 'react';
import '../styles/History.css'
import axios from 'axios';
import Profile from "../components/ProfileNavBar";
import Container from "@material-ui/core/Container";
import NestedList from "../components/leftnavbar";
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {CustomIcon} from "../Styles";

const CustomAdd = CustomIcon()(AddBox),
    CustomCheck = CustomIcon()(Check),
    CustomClear = CustomIcon()(Clear),
    CustomDelete = CustomIcon()(DeleteOutline),
    CustomDetailPanel = CustomIcon()(ChevronRight),
    CustomEdit = CustomIcon()(Edit),
    CustomExport = CustomIcon()(SaveAlt),
    CustomFilter = CustomIcon()(FilterList),
    CustomFirstPage = CustomIcon()(FirstPage),
    CustomLastPage = CustomIcon()(LastPage),
    CustomNextPage = CustomIcon()(ChevronRight),
    CustomPreviousPage = CustomIcon()(ChevronLeft),
    CustomResetSearch = CustomIcon()(Clear),
    CustomSearch = CustomIcon()(Search),
    CustomSortArrow = CustomIcon()(ArrowUpward),
    CustomThirdStateCheck = CustomIcon()(Remove),
    CustomViewColumn = CustomIcon()(ViewColumn);

const tableIcons = {
    Add: forwardRef((props, ref) => <CustomAdd {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <CustomCheck {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <CustomClear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <CustomDelete {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <CustomDetailPanel {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <CustomEdit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <CustomExport {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <CustomFilter {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <CustomFirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <CustomLastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <CustomNextPage {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <CustomPreviousPage {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <CustomResetSearch {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <CustomSearch {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <CustomSortArrow {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <CustomThirdStateCheck {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <CustomViewColumn {...props} ref={ref}/>)
};

class History extends Component {
    constructor(props) {
        super(props);
        if (!this.props.location || !this.props.location.state || !this.props.location.state.user) {
            this.props.history.push('');
        } else {
            this.user = this.props.location.state.user;
            this.pk = props.match.params.pk;
            if (!this.pk) {
                this.pk = this.user.id;
            }
        }
        this.state = {
            histories: []
        };
        this.tableColumns = [
            {title: 'Date', field: 'date', type: 'datetime', disableClick: true, editable: 'never'},
            {title: 'Operation', field: 'operation', disableClick: true, editable: 'never'},
            {title: 'Operand', field: 'operand', disableClick: true, editable: 'never'},
            {title: 'Details', field: 'details', disableClick: true, editable: 'never'}
        ];
    }


    componentDidMount() {
        if (!this.user) {
            this.props.history.push('');
        } else {
            const url = `http://127.0.0.1:8000/user/${this.pk}/logs`;
            axios.get(url).then(response => {
                const data = response.data;
                data.forEach((item, index, arr) => {
                    arr[index].date = new Date(item.date);
                });
                this.setState({
                    histories: data
                });
            }).catch(error => {
                this.props.history.push('/503');
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <main className='HomePageMain2'>
                    <NestedList user={this.user}
                                myHistory={this.props.history} inHistory/>
                    <div className="rightme">
                        <Profile pk={this.user.id} isSuperUser={this.user.is_superuser}/>
                        <Container className='cardGrid' maxWidth="md">
                            <MaterialTable columns={this.tableColumns} data={this.state.histories}
                                           icons={tableIcons} title='Histories'/>
                        </Container>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default History;
