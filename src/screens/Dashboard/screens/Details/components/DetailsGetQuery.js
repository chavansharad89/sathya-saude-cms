import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { onUploadFormDetails } from '../store/dispatchers';
import gql from 'graphql-tag';

const GetDetailsGetQuery = gql`
    query GetFormDetailsById($dataUploadId: Int!)
    {
        getDataUploadDetailsByDataUploadId(dataUploadId:$dataUploadId) {
            dataUploadId,
            categoryName,
            categoryId,
            subCategoryId,
            subCategoryName,
            duration,
            durationValue{
              fiscalYear,
              startDate,
              endDate
            },
            fileName,
            fileId,
            status,
            createdAt,
            createdBy,
            userName
            userName,
            notes,
            reason
        }
    }
`
const DetailsGetQuery = ({
    client,
    id,
    onUploadFormDetails,
    loadingUploadFormDetails,
    uploadFormDetailsLoaded
}) => {
    if(loadingUploadFormDetails === false && uploadFormDetailsLoaded === false) {
        onUploadFormDetails(true)
        client.query({
            query: GetDetailsGetQuery,
            variables: {
                dataUploadId:parseInt(id)
            }
        }) 
        .then(({data}) => {
            onUploadFormDetails(false, data.getDataUploadDetailsByDataUploadId)
        });
    }
    return '';
}

const mapStateWithProps = ({ detailsForm }) => {
    return {
        uploadFormDetailsLoaded: detailsForm.uploadFormDetailsLoaded,
        loadingUploadFormDetails: detailsForm.loadingUploadFormDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadFormDetails(status, value = null ) {
            dispatch(onUploadFormDetails(status, value))
        }
    };
};

const DetailsWithApollo = withApollo(DetailsGetQuery);

export default connect(mapStateWithProps, mapDispatchToProps)(withRouter(DetailsWithApollo));
