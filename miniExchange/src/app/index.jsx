 import { ApiProvider } from '../context/context';
import { AppUI } from './AppUI';

function App() {
  return (
    <ApiProvider>
      <AppUI />
    </ApiProvider>
  );
}

export default App;