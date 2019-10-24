import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import {getUserDetails} from '../../../utils/Authentication';
import {onUserEnter} from '../../../shared/Settings/store/dispatchers';
import {updateUploadeListDetails,
    updateAllUploadeListDetails,
    updateMyUploadeListDetails} from '../screens/UploadList/store/dispatchers';

const getDataUploads = gql`
    query getDataUploads ($categoryId: Int!, 
        $subCategoryId: Int!,
        $allUploadsPageId:Int,
        $myUploadsPageId:Int,
        $allUploadstatus:[String],
        $myUploadstatus:[String],
        $limit:Int,
        )
        {
            getDataUploads(categoryId:$categoryId,
                subCategoryId: $subCategoryId) 
            {
                myUploads(
                    pageId: $myUploadsPageId,
                    limit: $limit,
                    status:$myUploadstatus
                    ) {
                        activityList{
                            dataUploadId,
                            categoryName,
                            categoryId,
                            subCategoryId,
                            createdBy,
                            subCategoryName,
                            duration,
                            durationValue {
                                fiscalYear,
                                startDate,
                                endDate
                            },
                            fileName,
                            status,
                            userName,
                            createdAt
                        },
                        totalCount,
                
                    },
                allUploads(
                    pageId: $allUploadsPageId,
                    limit: $limit,
                    status:$allUploadstatus
                ) {
                    activityList{
                        dataUploadId,
                        categoryName,
                        categoryId,
                        subCategoryId,
                        createdBy,
                        subCategoryName,
                        duration,
                        durationValue {
                            fiscalYear,
                            startDate,
                            endDate
                        },
                        fileName,
                        status,
                        userName,
                        createdAt
                    },
                    totalCount,
                }
            }
        }`;
const setData =(onUserEnter)=>{
    const response = getUserDetails();
    onUserEnter(response);
    window.focus();
}

const getDashboardDetails = ({
    client,
    updateUploadeListDetails,
    updateAllUploadeListDetails,
    updateMyUploadeListDetails,

    alluploadsLoadingStatus,
    allloadingListDetails,
    myuploadsLoadingStatus,
    myloadingListDetails,

    title,
    subTitle,
    myUploadsPageId,
    allUploadsPageId,
    allUploadstatus,
    myUploadstatus,
    limit,
    uploadsLoadingStatus,
    loadingListDetails,

    allUploadsCheckBoxClicked,
    allUploadsPaginate,
    myUploadsPaginate,
    myUploadsCheckBoxClicked,
    onUserEnter
}) => {
        const subtitle = subTitle ? subTitle.id : 0;
        // const promis = client.query({
        //     query: getDataUploads,
        //     variables: {
        //         categoryId:title.id,
        //         subCategoryId:subtitle,
        //         myUploadsPageId:myUploadsPageId,
        //         allUploadsPageId:allUploadsPageId,
        //         allUploadstatus:allUploadstatus,
        //         myUploadstatus:myUploadstatus,
        //         limit:limit
        //     }
        // })

       
        if(title.id && uploadsLoadingStatus===false && loadingListDetails===false) {
            updateUploadeListDetails(true);
            client.query({
                query: getDataUploads,
                variables: {
                    categoryId:title.id,
                    subCategoryId:subtitle,
                    myUploadsPageId:myUploadsPageId,
                    allUploadsPageId:allUploadsPageId,
                    allUploadstatus:allUploadstatus,
                    myUploadstatus:myUploadstatus,
                    limit:limit
                }
            })
            .then(({data}) => {  
                updateUploadeListDetails(false,data.getDataUploads);
                setData(onUserEnter);
            });
        }
        else if (alluploadsLoadingStatus===false && allloadingListDetails===false){
            updateAllUploadeListDetails(true);
            client.query({
                query: getDataUploads,
                variables: {
                    categoryId:title.id,
                    subCategoryId:subtitle,
                    myUploadsPageId:myUploadsPageId,
                    allUploadsPageId:allUploadsPageId,
                    allUploadstatus:allUploadstatus,
                    myUploadstatus:myUploadstatus,
                    limit:limit
                }
            })
            .then(({data}) => {  
                updateAllUploadeListDetails(false,data.getDataUploads);
                setData(onUserEnter);
            });
        }
        else if (myuploadsLoadingStatus===false && myloadingListDetails===false){
            updateMyUploadeListDetails(true);
            client.query({
                query: getDataUploads,
                variables: {
                    categoryId:title.id,
                    subCategoryId:subtitle,
                    myUploadsPageId:myUploadsPageId,
                    allUploadsPageId:allUploadsPageId,
                    allUploadstatus:allUploadstatus,
                    myUploadstatus:myUploadstatus,
                    limit:limit
                }
            })
            .then(({data}) => {  
                updateMyUploadeListDetails(false,data.getDataUploads);
                setData(onUserEnter);
            });
        }

    return '';
};

const mapStateWithProps = ({setting,uploadList}) => {
    return {
        uploadsLoadingStatus:uploadList.uploadsLoadingStatus,
        loadingListDetails:uploadList.loadingListDetails,
        alluploadsLoadingStatus:uploadList.alluploadsLoadingStatus,
        allloadingListDetails: uploadList.allloadingListDetails,
        myuploadsLoadingStatus:uploadList.myuploadsLoadingStatus,
        myloadingListDetails: uploadList.myloadingListDetails,


        title:setting.title,
        subTitle:setting.subTitle,
        limit:uploadList.pageLimit,
        allUploadsPageId:uploadList.allUploadsPageId,
        myUploadsPageId:uploadList.myUploadsPageId,
        allUploadstatus:uploadList.allUploadstatus,
        myUploadstatus:uploadList.myUploadstatus,

        allUploadsCheckBoxClicked:uploadList.allUploadsCheckBoxClicked,
        allUploadsPaginate:uploadList.allUploadsPaginate,
        myUploadsCheckBoxClicked:uploadList.myUploadsCheckBoxClicked,
        myUploadsPaginate:uploadList.myUploadsPaginate
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUploadeListDetails(status,data=null) {
            dispatch(updateUploadeListDetails(status,data));
        },
        updateAllUploadeListDetails(status,data=null) {
            dispatch(updateAllUploadeListDetails(status,data));
        },
        updateMyUploadeListDetails(status,data=null) {
            
            dispatch(updateMyUploadeListDetails(status,data));
        },
        onUserEnter(value){
            dispatch(onUserEnter(value))
        }
    };
};

export default connect(mapStateWithProps, mapDispatchToProps)( withApollo(getDashboardDetails) );