import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GetCurrentUserUseCaseImpl } from '@data/useCases/GetCurrentUserUseCaseImpl';
import { AuthRepositoryImpl } from '@data/repositories/AuthRepositoryImpl';
import { AuthRemoteDataSource } from '@data/datasources/api/AuthRemoteDataSource';
import { User } from '@domain/entities/User';
import { RouterPath } from '@presentation/routes/RouterPath';
import { httpProvider } from '@data/providers/AxiosHttpProvider';

const ProtectedRoute: React.FC = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const checkUserSession = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setUser(null); // No token, user is not logged in
        return;
      }

      // Set the token for all subsequent API requests
      httpProvider.setAuthToken('directus', accessToken);

      const authDataSource = new AuthRemoteDataSource();
      const authRepository = new AuthRepositoryImpl(authDataSource);
      const getCurrentUserUseCase = new GetCurrentUserUseCaseImpl(authRepository);

      try {
        const currentUser = await getCurrentUserUseCase.execute();
        setUser(currentUser);
      } catch (error) {
        // The token is likely expired or invalid
        console.error("Session check failed, token might be invalid:", error);
        setUser(null);
        // Clean up invalid tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    };

    checkUserSession();
  }, []);

  // Show a loading indicator while the session is being checked
  if (user === undefined) {
    return <div>Loading session...</div>;
  }

  // If there's a user, show the protected content, otherwise redirect to sign-in
  return user ? <Outlet /> : <Navigate to={RouterPath.SIGN_IN} />;
};

export default ProtectedRoute;
