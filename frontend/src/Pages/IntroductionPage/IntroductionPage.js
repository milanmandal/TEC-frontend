import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { setCurrentUser } from '../../Redux/User/UserActions';

import './IntroductionPage.Styles.css';

import Header from '../../Components/Header/Header';
import Body from '../../Components/Body/Body';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import url from '../../Components/Url/Url'


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})



class IntroductionPage extends Component {
  constructor() {
    super()
    this.state = {
      CompanyName: '',
      info: '',
      page: ''
    }
  }

  componentDidMount() {
    sessionStorage.setItem('round', 'round1')
    console.log(sessionStorage)
    Axios.get(url + 'user/' + this.props.match.params.id)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            CompanyName: response.data.company,
            page: response.data.page
          })

          this.props.setCurrentUser(response.data)
          toast.success('You are alloted with the company ' + response.data.company.toUpperCase(), { className: 'companyAllotmentPopUp' })
        }
      })
      .catch((error) => {
        console.log(error);
      })


    Axios.get(url + 'company/info',
      {
        headers: {
          "authorization": "Bearer " + sessionStorage.usertoken
        }
      }
    )
      .then(res => res.data.map(company => company.name.toUpperCase() === this.state.CompanyName.toUpperCase() ?
        this.setState({ info: company.info })
        : console.log()
      ))
  }

  render() {
    if (sessionStorage.usertoken) {
      return (
        this.state.CompanyName ?
          <div className='introduction-page'>
            <div className='company-introduction'>
              <Header heading={this.state.CompanyName} />
              <Body body={this.state.info} />
              <div className='button'>
                <Link to={
                  this.state.page ?
                    this.state.page
                    : '/round1set/' + this.props.match.params.id
                }>
                  <button>Go &#8594;</button>
                </Link>
              </div>
            </div>
          </div>
          :
          <div>LOADING....</div>
      )
    }
    else { window.location = '/'; }
  }

}



export default connect(mapStateToProps, mapDispatchToProps)(IntroductionPage);