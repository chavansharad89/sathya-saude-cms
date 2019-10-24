import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import {
    updateDetails
} from './store/dispatchers';

 const getSettingsDetails = gql`
     query getSettings {
        getSettingsForCMS {
            menu {
                id,
                displayName,
                children {
                    id,
                    displayName
                }
            }
        }
    }`;

const getSettings = ({
    client,
    updateDetails,
    loadingSettings,
    match
}) => {
        if(loadingSettings){
            client.query({
                query: getSettingsDetails,  
            }) 
            .then(details => {
                updateDetails(details.data.getSettingsForCMS.menu, match.params);
            });
           
        }
        return '';
            
};

const mapStateWithProps = ({setting}) => {
    
    return {
        loadingSettings:setting.loadingSettings
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDetails(menulist = null,params) {
            dispatch(updateDetails( menulist,params));
        }
    };
};

export default connect(mapStateWithProps, mapDispatchToProps)(withRouter(withApollo(getSettings)));