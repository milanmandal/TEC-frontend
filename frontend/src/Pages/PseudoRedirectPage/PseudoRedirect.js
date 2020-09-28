import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import url from '../../Components/Url/Url';
import { setCurrentUser } from '../../Redux/User/UserActions';

class PseudoRedirect extends Component {
    constructor() {
        super()
        this.state = {
            page: ''
        }
    }

    componentDidMount() {
        Axios.get(url + 'user/' + this.props.match.params.id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        page: response.data.page
                    })

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
                <Redirect to={
                    this.state.page ?
                        this.state.page
                        : '/intro/' + this.props.currentUser.currentUser._id
                }
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(PseudoRedirect)