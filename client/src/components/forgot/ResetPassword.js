import React from 'react'
import PropTypes from 'prop-types'

const ResetPassword = props => {
    return (
        <div className="row">
            <div className="col-md-12">
                <form action="/reset/<% token %>" method="POST">
                    <h1>Reset Password</h1>
                    <br />
                    <div className="form-group-resetPassword">
                        <label for='password'>New Password: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input 
                            type='password' 
                            name='password' 
                            value='' 
                            placeholder='New Password' 
                            autofocus='autofocus' 
                            className="form-control" 
                        />
                    </div>
                    <br />
                    <div className="form-group-resetPassword">
                        <label for='password'>Confirm New Password: </label>
                        <input 
                            type='password' 
                            name='confirm' 
                            value='' 
                            placeholder='Confirm New Password' 
                            className="form-control" 
                        />
                    </div>
                    <br />
                    <div className='form-group'>
                        <button type='submit' className='btn-login btn-primary'>Update Password</button>
                    </div>
                </form>
                <h5 className="footer-login">© 2019 Copyright. Blockchain Bingo, all rights reserved.</h5>
            </div>
        </div>
    )
}

ResetPassword.propTypes = {

}

export default ResetPassword
