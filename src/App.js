import './App.css';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Formula from '../src/pages/Formula';
import TargetArea from '../src/pages/TargetArea'
import 'antd/dist/antd.css';

function App() {
  return (
    <div style={{padding: '30px'}}>
      <Router>
        <div style={{ textAlign: 'center', marginBottom: "30px"}}>
          <Link style={{marginRight: '16px'}} to='/'>公式编辑</Link>
          <Link to='/targetArea'>目标地区编辑</Link>
        </div>
          <Switch>
              <Route exact path="/" component={Formula}/>
              <Route exact path="/targetArea" component={TargetArea}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
