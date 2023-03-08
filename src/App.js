import RouteApp from './routes';
import { DataProvider } from './components/Context/MyContext';
function App() {
  return (
    <div className="App">
      <DataProvider>
        <RouteApp />
      </DataProvider>
    </div>
  );
}

export default App;
