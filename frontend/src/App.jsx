import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from './Layout';
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';

function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage/>} />

            {/* <Route path="/events">
              <Route path=":path/:routeId" element={<EventInfoPage />} />
            </Route> */}
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
