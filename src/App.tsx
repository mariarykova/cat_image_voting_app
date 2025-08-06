import './App.css';
import { CatProvider } from './context/CatContext';
import { CatGallery } from './components/CatGallery';

function App() {
  return (
    <CatProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="text-center py-6">
          <h1 className="text-3xl font-bold text-pink-600">🐱 Cat Image Gallery</h1>
        </header>
        <main>
          <CatGallery />
        </main>
      </div>
    </CatProvider>
  );
}

export default App;
