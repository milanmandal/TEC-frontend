import React, { Component } from 'react'
import Crisis from '../../Components/Crisis/Crisis'
import { connect } from 'react-redux'
import Axios from 'axios'

class ProductionCrisis2 extends Component {
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
            crisis: res.data[1].passage,
            question: res.data[1].question,
            options: [res.data[1].option1, res.data[1].option2, res.data[1].option3, res.data[1].option4]
        })
    )}

    render() {
        if(sessionStorage.usertoken && this.props.currentUser.currentUser)
        {
            return (
                this.state.crisis && this.state.question && this.state.options ? 
                <div className='crisis-page'>
                    <Crisis
                        heading='Production 02'
                        crisis={this.state.crisis}
                        question={this.state.question}
                        options={this.state.options}
                        redirect='/crisis/finance/1'
                        currentPath={this.props.match.url}
                    />
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

export default connect(mapStateToProps)(ProductionCrisis2);
