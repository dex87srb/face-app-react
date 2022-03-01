import { connect } from 'react-redux';
import { appendData } from './actions/addUsers';
import { getData } from './actions/getUsers'
import { Users } from '../components/Users/Users';


const MapStateToProps = (state) => ({
    users: state.users
})

const MapDispatchToProps = {
    appendData,
    getData
};

export const Container = connect(MapStateToProps, MapDispatchToProps)(Users);