import React from 'react'
import Avatar from '@mui/material/Avatar';
import avatar from "./avatar.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


function header({ text }) {
  return (
    <div class="container-fluid pb-3">
      <div class="row align-items-center">
        <div class="col">
          <h1>{text}</h1>
        </div>

        <div class="col-auto">
          <span class="notification-icon"><NotificationsNoneIcon /></span>
          <div class="btn-group">
            <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <Avatar alt="Name Surname" src={avatar} />
            </div>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider"></hr></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default header