import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GetCurrentUserUseCaseImpl } from '@data/useCases/GetCurrentUserUseCaseImpl';
import { RefreshTokenUseCaseImpl } from '@data/useCases/RefreshTokenUseCaseImpl';
import { AuthRepositoryImpl } from '@data/repositories/AuthRepositoryImpl';
import { AuthRemoteDataSource } from '@data/datasources/api/AuthRemoteDataSource';
import { User } from '@domain/entities/User';
import { RouterPath } from '@presentation/routes/RouterPath';
import { httpProvider } from '@data/providers/AxiosHttpProvider';

const authDataSource = new AuthRemoteDataSource();
const authRepository = new AuthRepositoryImpl(authDataSource);
const getCurrentUserUseCase = new GetCurrentUserUseCaseImpl(authRepository);
const refreshTokenUseCase = new RefreshTokenUseCaseImpl(authRepository);

const ProtectedRoute: React.FC = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const handleSession = async (): Promise<User | null> => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return null;
      }

      httpProvider.setAuthToken('directus', accessToken);

      try {
        // Try to fetch the user with the current token
        const currentUser = await getCurrentUserUseCase.execute();
        return currentUser;
      } catch (error: any) {
        // Check if the error is specifically a token expired error
        if (error?.response?.data?.errors?.[0]?.extensions?.code === 'TOKEN_EXPIRED') {
          console.log("Access token expired. Attempting to refresh...");
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            return null; // No refresh token, user must log in again
          }

          try {
            // Get a new access token and a new refresh token
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshTokenUseCase.execute(refreshToken);
            
            // Store the new (and potentially rotated) tokens
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            
            // Set the new token for the provider and retry fetching the user
            httpProvider.setAuthToken('directus', newAccessToken);
            return await getCurrentUserUseCase.execute();

          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            return null; // Refresh failed, user must log in again
          }
        }
        
        // For any other errors, re-throw to be caught by the outer catch
        throw error;
      }
    };

    const checkSession = async () => {
      try {
        const currentUser = await handleSession();
        setUser(currentUser);
      } catch (error) {
        // This catches errors from the initial user fetch or the refresh process
        console.error("Session check failed, redirecting to login:", error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
      }
    };

    checkSession();
  }, []);

  if (user === undefined) {
    return <div>Loading session...</div>;
  }

  return user ? <Outlet /> : <Navigate to={RouterPath.SIGN_IN} />;
};

export default ProtectedRoute;
