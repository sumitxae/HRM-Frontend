import React, { useEffect, useState } from 'react'

const AttendEmploye = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [isWithinOffice, setIsWithinOffice] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    // Predefined office location (latitude, longitude)
    const officeLocation = {
      latitude: 37.4221, // Example latitude (Google HQ in Mountain View)
      longitude: -122.0841 // Example longitude
    };
  
    // Function to get current location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            verifyLocation(latitude, longitude);
          },
          error => {
            setErrorMessage('Unable to retrieve your location');
          }
        );
      } else {
        setErrorMessage('Geolocation is not supported by this browser.');
      }
    };
  
    // Function to verify if the user is within a certain distance from the office
    const verifyLocation = (latitude, longitude) => {
      const distance = calculateDistance(latitude, longitude, officeLocation.latitude, officeLocation.longitude);
      const allowedDistance = 0.5; // 0.5 km radius allowed for attendance (customizable)
      
      if (distance <= allowedDistance) {
        setIsWithinOffice(true);
      } else {
        setIsWithinOffice(true);
        setErrorMessage('You are not within the allowed office location to mark attendance.');
      }
    };
  
    // Function to calculate distance between two coordinates (Haversine Formula)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    };
  
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };
  
    
    // Automatically get location on component mount
    useEffect(() => {
      getLocation();
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Employee Attendance</h1>
  
        {/* Display current location */}
        {location.latitude && location.longitude ? (
          <div className="text-center mb-4">
            <p>Your Location: {location.latitude}, {location.longitude}</p>
          </div>
        ) : (
          <p className="text-center mb-4">Fetching location...</p>
        )}
  
        {/* Show verification status */}
        {isWithinOffice ? (
          <div className="text-center text-green-500 mb-4">
            <p>You are within the office location. You can mark attendance.</p>
          </div>
        ) : (
          <div className="text-center text-red-500 mb-4">
            {errorMessage ? <p>{errorMessage}</p> : <p>Verifying your location...</p>}
          </div>
        )}
  
        {/* Employee Attendance Form */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Employee ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Attendance</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {/* Employee 1 */}
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">EMP001</td>
                <td className="py-3 px-6">John Doe</td>
                <td className="py-3 px-6">
                  <input type="checkbox" className="form-checkbox text-green-500 h-5 w-5" disabled={!isWithinOffice} />
                  <label className="ml-2">Present</label>
                </td>
              </tr>
  
            </tbody>
          </table>
        </div>
  
        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${!isWithinOffice ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isWithinOffice}
          >
            Submit Attendance
          </button>
        </div>
      </div>
  )
}

export default AttendEmploye
