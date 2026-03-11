import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StoryPage from './pages/StoryPage'
import CollectionsPage from './pages/CollectionsPage'
import VisitPage from './pages/VisitPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/our-story" element={<StoryPage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/visit" element={<VisitPage />} />
    </Routes>
  )
}