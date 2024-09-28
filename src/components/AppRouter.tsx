import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from "../routes";
import { useTypedSelector } from "../hooks/useTypedSelector";

const AppRouter: React.FC = () => {
    const { isAuth } = useTypedSelector(state => state.auth);

    return (
        <Routes>
            {isAuth
                ? privateRoutes.map(route => (
                    <Route
                        path={route.path}
                        element={<route.component />}
                        key={route.path}
                    />
                ))
                : publicRoutes.map(route => (
                    <Route
                        path={route.path}
                        element={<route.component />}
                        key={route.path}
                    />
                ))
            }
            {/* Redirect to home in case of no matching route */}
            <Route path="*" element={<Navigate to={RouteNames.HOME} />} />
        </Routes>
    );
};

export default AppRouter;
