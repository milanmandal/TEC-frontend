import React, { Component } from 'react'
import Crisis from '../../Components/Crisis/Crisis';
import Axios from 'axios';
import { connect } from 'react-redux';

class ProductionCrisis1 extends Component {
    constructor(){
        super()
        this.state = {
            crisis: null,
            question: null,
            options: []
        }
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/' + this.props.currentUser.currentUser.company + '/getcrisisproduction',
        {
          headers:{
            "authorization":"Bearer "+sessionStorage.usertoken
          }
        })
        .then(res => this.setState({
            crisis: res.data[0].passage,
            question: res.data[0].question,
            options: [res.data[0].option1, res.data[0].option2, res.data[0].option3, res.data[0].option4]
        })
    )}

    render() {
        if(sessionStorage.usertoken)
        {
            return (
                this.state.crisis && this.state.question && this.state.options ? 
                <div className='crisis-page'>
                    <Crisis heading='Production 01' crisis={this.state.crisis} question={this.state.question} options={this.state.options} redirect='/crisis/production/2'/>
                </div>
                : <div className='loading'>Loading...</div>
            )
        }
        else{window.location='/';}
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user
});

export default connect(mapStateToProps)(ProductionCrisis1);
