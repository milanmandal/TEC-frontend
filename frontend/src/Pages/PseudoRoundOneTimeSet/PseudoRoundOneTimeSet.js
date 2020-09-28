import React, { Component } from 'react'

export default class AfterIntro extends Component {
    render() {
        sessionStorage.setItem('round', 'round1')
        window.location = '/redirect1/' + this.props.match.params.id
        return (
            <div></div>
        )
    }
}
