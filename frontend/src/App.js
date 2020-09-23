import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Modal from 'react-modal';
//import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import HomePage from './Pages/Homepage/Homepage';
import IntroductionPage from './Pages/IntroductionPage/IntroductionPage';
import ComprehensionRules from './Pages/ComprehensionRules/ComprehensionRules';
import ProductionComprehension from './Pages/ProductionComprehension/ProductionComprehension';
import ProductionQuestions from './Pages/ProductionQuestions/ProductionQuestions';
import FinanceComprehension from './Pages/FinanceComprehension/FinanceComprehension';
import FinanceQuestions from './Pages/FinanceQuestions/FinanceQuestions';
import RnDComprehension from './Pages/RnDComprehension/RnDComprehension';
import RnDQuestions from './Pages/RnDQuestions/RnDQuestions';
import SalesComprehension from './Pages/SalesComprehension/SalesComprehension';
import SalesQuestions from './Pages/SalesQuestions/SalesQuestions';
import RoundOneScore from './Pages/Round1Score/RoundOneScore';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Round3Rules from './Pages/Round3Rules/Round3Rules';
import ProductionCrisis1 from './Pages/ProductionCrisis1/ProductionCrisis1';
import ProductionCrisis2 from './Pages/ProductionCrisis2/ProductionCrisis2';
import FinanceCrisis1 from './Pages/FinanceCrisis1/FinanceCrisis1';
import FinanceCrisis2 from './Pages/FinanceCrisis2/FinanceCrisis2';
import RndCrisis1 from './Pages/RndCrisis1/RndCrisis1';
import RndCrisis2 from './Pages/RndCrisis2/RndCrisis2';
import SalesCrisis1 from './Pages/SalesCrisis1/SalesCrisis1';
import SalesCrisis2 from './Pages/SalesCrisis2/SalesCrisis2';
import RoundThreeScore from './Pages/Round3Score/RoundThreeScore';
import Round2Rules from './Pages/Round2Rules.js/Round2Rules';
import StockMarket from './Pages/Round2/Round2';
import ScoreSheet from './Pages/ScoreSheet/ScoreSheet';
import NavBar from './Components/NavBar/NavBar';
import PseudoRedirect from './Pages/PseudoRedirectPage/PseudoRedirect';

Modal.setAppElement('#root')

class App extends Component {
  constructor() {
    super();
    this.state = {
      flag: false,

    }
    this.userUpdate = this.userUpdate.bind(this);
    window.history.pushState(null, null, '/')
  }

  userUpdate(userObject) {
    this.setState(userObject)
  }

  render() {
    return (
      <div className="App">
        <div className='bigger-display'>
          <NavBar />

          <Provider store={store}>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/redirect/:id' component={PseudoRedirect} />
              <Route exact path='/intro/:id' component={IntroductionPage} />
              <Route exact path='/comprehensionRules/:companyName' component={ComprehensionRules} />
              <Route exact path='/comprehension/:companyName/Production' component={ProductionComprehension} />
              <Route exact path='/comprehension/:companyName/ProductionQuestions' component={ProductionQuestions} />
              <Route exact path='/comprehension/:companyName/Finance' component={FinanceComprehension} />
              <Route exact path='/comprehension/:companyName/FinanceQuestions' component={FinanceQuestions} />
              <Route exact path='/comprehension/:companyName/Resdev' component={RnDComprehension} />
              <Route exact path='/comprehension/:companyName/ResdevQuestions' component={RnDQuestions} />
              <Route exact path='/comprehension/:companyName/Sales' component={SalesComprehension} />
              <Route exact path='/comprehension/:companyName/SalesQuestions' component={SalesQuestions} />
              <Route exact path='/round1/score' component={RoundOneScore} />
              <Route exact path='/round2/rules/:id' component={Round2Rules} />
              <Route exact path='/stockmarket' component={StockMarket} />
              <Route exact path='/crisis/production/1' component={ProductionCrisis1} />
              <Route exact path='/crisis/production/2' component={ProductionCrisis2} />
              <Route exact path='/crisis/finance/1' component={FinanceCrisis1} />
              <Route exact path='/crisis/finance/2' component={FinanceCrisis2} />
              <Route exact path='/crisis/rnd/1' component={RndCrisis1} />
              <Route exact path='/crisis/rnd/2' component={RndCrisis2} />
              <Route exact path='/crisis/sales/1' component={SalesCrisis1} />
              <Route exact path='/crisis/sales/2' component={SalesCrisis2} />
              <Route exact path='/round3/rules/:id' component={Round3Rules} />
              <Route exact path='/round3/score' component={RoundThreeScore} />
              <Route exact path='/scoresheet/:id' component={ScoreSheet} />
            </Switch>
          </Provider>
        </div>
        <div className='smaller-display'>
          <h1>Use a bigger display</h1>
        </div>
      </div>
    );
  }
}

export default App;