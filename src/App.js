import logo from './logo.png';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Provider } from 'react-redux';
import store from './store';
import Members from './features/members/Members';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-content">
          <img src={logo} alt="Hope Logo" className='logo' />
          <Members />
        </div>
      </div>
    </Provider>
  );
}

export default App;
