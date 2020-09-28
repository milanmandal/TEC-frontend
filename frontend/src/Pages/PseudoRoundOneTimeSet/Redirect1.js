import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import url from '../../Components/Url/Url';
import { setCurrentUser } from '../../Redux/User/UserActions';

class Redirect1 extends Component {
    componentDidMount() {
        Axios.get(url + 'user/' + this.props.match.params.id)
            .then(response => {
                if (response.status === 200) {
                    this.props.setCurrentUser(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (this.props.currentUser.currentUser) {
            return (
                <Redirect to={'/comprehensionRules/' + this.props.currentUser.currentUser.company} />
            )
        }
        else { return (<div></div>) }
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = (state) => ({
    currentUser: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Redirect1)