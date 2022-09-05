import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../services/AuthService'

const PublicRoute = ({ component: Component, ...rest}) => {
    const isauth = getToken();
    return isauth ? <Outlet /> : <Navigate to="/premium-content" />;
}

export default PublicRoute