
import './App.css';
import  Teamdata from "../src/Teaminfo/Teamdata"
import { Provider } from 'react-redux';

import store from "../src/store/store"
function App() {
  return (
   
    <div className="App">
        <Provider store={store}>
       
      <Teamdata/>
       </Provider>
    </div>
     
  );
}

export default App;
