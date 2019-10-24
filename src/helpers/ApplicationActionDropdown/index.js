import React from 'react';
import { withRouter } from 'react-router-dom';
import {removeSession, removeCookies} from '../../utils/Authentication'
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import './index.scss';

const actiondropdownOptions = [
    { id:1, value:'Creighton' },
    { id:2, value:'Change Password' },
    { id:3, value:'Logout'   }
]


const ApplicationActionDropdown=({history,
    client,
    role,
    username

}) =>{
    const onSelectOptionChange =(event)=>{
        const selectedOption=event.target.value
        if(selectedOption==='Logout'){
            logout(event)
        }
        if(selectedOption ==='Change Password'){
            history.push("/change-password");
        }
    }

    const logout=(e)=> {
        e.preventDefault();
        return client.mutate({
            mutation: gql`mutation logout {
                logout {
                    accountId
                }
            }`
        })
            .then(resp => {
                removeSession();
                removeCookies();
                history.push('/login');
            })
            .catch(err => {
                console.log(err);   
            })
    }
    
    return (
        <div className='application-action-dropdown'>
            <div className='application-action-dropdown__content'>
                <div className='label'>{username}</div>
                <select onChange={onSelectOptionChange}>
                {
                    actiondropdownOptions.map(({value}, index) => {
                        return (
                            <option key={index} 
                                className={value === 'Creighton' ? 'hide-element' : ''}>
                                    {value} 
                            </option>
                        )
                    })
                }
                </select>
                <div className='admin-text'> {role} </div>
            </div>
        </div>
    )
}
const mapStateWithProps = ({setting}) => {
    return {
        role:setting.role,
        username:setting.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
};
const ApplicationActionDropdownRouter = withRouter(ApplicationActionDropdown)
export default connect (mapStateWithProps,mapDispatchToProps)(withApollo(ApplicationActionDropdownRouter)) 