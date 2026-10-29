import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Demo accounts: app restart par reset ho jayenge.
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleFavorite = (destinationId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(destinationId)) {
        return currentFavorites.filter((id) => id !== destinationId);
      }

      return [...currentFavorites, destinationId];
    });
  };

  const isFavorite = (destinationId) => {
    return favorites.includes(destinationId);
  };

  const addBooking = (booking) => {
    setBookings((currentBookings) => [
      ...currentBookings,
      {
        ...booking,
        id: Date.now().toString(),
      },
    ]);
  };

  const registerUser = (name, email) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    const alreadyExists = users.some(
      (user) => user.email === cleanEmail
    );

    if (alreadyExists) {
      return {
        success: false,
        message: 'This email already has an account. Please log in.',
      };
    }

    const newUser = {
      id: Date.now().toString(),
      name: cleanName,
      email: cleanEmail,
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);
    setCurrentUser(newUser);

    return { success: true };
  };

  const loginUser = (email) => {
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email === cleanEmail
    );

    if (!existingUser) {
      return {
        success: false,
        message: 'Account not found. Please create an account first.',
      };
    }

    setCurrentUser(existingUser);
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        bookings,
        toggleFavorite,
        isFavorite,
        addBooking,
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }

  return context;
}