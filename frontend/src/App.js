import AutoInput from "./AutoInput";
import { TagProvider } from "./Context/TagContext";
import Products from "./Products";

function App() {
  return (
    <div className="App container">
      <h1>PRODUCTS</h1>
      <TagProvider>
        <AutoInput />
        <Products />
      </TagProvider>
    </div>
  );
}

export default App;
