import './App.css'
import ScrollView from './ScrollView';

function App() {
  const url="https://dummyjson.com/products?limit=100";

  return (
   <div>
      <ScrollView url={url}/>
   </div>
  )
}

export default App
