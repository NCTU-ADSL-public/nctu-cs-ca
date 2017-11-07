import React from 'react';
import Main from './Main.teacher';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = () => (
  <div>
    <Main />
  </div>
);

export default App;
