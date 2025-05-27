
/*import { useNavigate } from 'react-router-dom';

export default function IntroScreen() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-5xl font-bold mb-4">🧭 Roamio</h1>
      <p className="text-lg text-gray-600 mb-8 italic">Explore. Bookmark. Roam.</p>
      <button
        className="text-4xl animate-bounce"
        onClick={() => navigate('/dashboard/map')}
      >
        ↓
      </button>
    </div>
  );
} */

// Dashboard.jsx
import { useRef } from 'react';
import MapScreen from './MapScreen'; // Your enhanced MapScreen component
// We'll create IntroContent.jsx next
// import IntroContent from './IntroContent'; // Assuming you'll create this from your old Dashboard content

// Define IntroContent directly here or import if you prefer a separate file
function IntroContent({ onScrollDownClick }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
      <h1 className="text-5xl font-bold mb-4">🧭 Roamio</h1>
      <p className="text-lg text-gray-600 mb-8 italic">Explore. Bookmark. Roam.</p>
      <button
        className="text-4xl animate-bounce cursor-pointer"
        onClick={onScrollDownClick}
        aria-label="Scroll to map"
      >
        ↓
      </button>
    </div>
  );
}


export default function Dashboard() {
  const mapScreenRef = useRef(null);

  const handleScrollToMap = () => {
    mapScreenRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Section 1: Intro Content */}
      <section id="intro-section">
        <IntroContent onScrollDownClick={handleScrollToMap} />
      </section>

      {/* Section 2: Map Screen */}
      <section id="map-section" ref={mapScreenRef} className="h-screen"> {/* Ensure map section also aims for full height */}
        <MapScreen />
      </section>
    </div>
  );
}