import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import {
    updateDetails,
    tableLoadingStatus
} from '../store/dispatchers';
import {getUserDetails} from '../../../utils/Authentication';
import {onUserEnter} from '../../../shared/Settings/store/dispatchers'

const getHomesDetails = gql`
    query getDashboardDetails {
        getDashboardDetailsForCMS {
            categoryDataMetrics {
              categoryId,
              displayName,
              allUploads,
              myUploads
            },
            recentActivities {
              dataUploadId,
              categoryId,
              subCategoryId,
              categoryName,
              subCategoryName,
              duration,
              userName,
              createdAt,
              createdBy,
              durationValue {
                fiscalYear,
                startDate,
                endDate
              },
              fileName,
              status
            }
          }
    }`;
const getHomeDetails = ({
    client,
    updateDetails,
    onUserEnter,
    uploadHomeLoadingStatus,
    loadingHomeDetails
}) => {
        if(loadingHomeDetails === false && uploadHomeLoadingStatus===false){
           
            updateDetails(true);
            client.query({
                query: getHomesDetails,
                
            })
            .then(details => {
                updateDetails(false,details.data.getDashboardDetailsForCMS);
                const response = getUserDetails();
                // tableLoadingStatus(false)
                onUserEnter(response)
            });
       
        }
            
           
    
    return '';
};

const mapStateWithProps = ({home}) => {
    return {
        loadingHomeDetails:home.loadingHomeDetails,
        uploadHomeLoadingStatus:home.uploadHomeLoadingStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDetails(status,data=null) {
            dispatch(updateDetails(status,data));
        },
        onUserEnter(value){
            dispatch(onUserEnter(value))
        },
        tableLoadingStatus(data) {
            dispatch(tableLoadingStatus(data));
        }
    };
};

export default connect(mapStateWithProps, mapDispatchToProps)( withApollo(getHomeDetails) );