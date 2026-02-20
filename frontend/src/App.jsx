import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from './Layout';
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';
import EventsPage from './Pages/EventsPage/EventsPage';
import EventDetailPage from './Pages/EventDetailPage';

function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            /> */}
            {/* <Route path="/addEvent" element={<PrivateRoute>
              <AddEventPage />
            </PrivateRoute> */}
            {/* <Route path="/editEvent">
              <Route path=":path/:routeId" element={
                <PrivateRoute>
                  <EditEventPage />
                </PrivateRoute>
              } />
            </Route> */}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
