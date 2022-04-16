import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const UserMenu = () => {

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <NavDropdown title={userInfo.name} id="username">
            <LinkContainer to='profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
    )
}

export default UserMenu;