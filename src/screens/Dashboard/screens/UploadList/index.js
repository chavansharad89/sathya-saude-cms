import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllUploads from '../../components/AllUploads'
import MyUploads from '../../components/MyUploads'
import Loader from  '../../../../helpers/Loader/Loader'

class uploadList extends Component {
    render() {
        const {loadingListDetails} =this.props
        return (
            loadingListDetails? <Loader/>
            :   <React.Fragment>
                    <MyUploads/>
                    <AllUploads/>
                </React.Fragment>
        );
    }
}
const mapStateToProps = ({uploadList}) => {
    return {
        loadingListDetails:uploadList.loadingListDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       
    };
};

export default connect (mapStateToProps,mapDispatchToProps)((uploadList))