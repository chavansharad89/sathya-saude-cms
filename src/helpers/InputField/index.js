import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { FILE_API_URL } from '../../constants';
import Loader from '../Loader/Loader'
import { onFileUploadId } from '../../screens/Dashboard/screens/UploadForm/store/dispatchers';

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: props.selectedFile ? props.selectedFile : 'Browse the file',
            fileLoadingStatus:false
        }
    }
    _onFileTypeChange(e) {
        const _filename =  e.target.files[0].name === '' ? 'Browse the file' : e.target.files[0].name;
        this.setState({
            
            filename : _filename
        });
        this._onFileUploadId(e.target.files[0]);
        this.props.onFileUploadChange(e.target.files[0]);
    }

    _onFileUploadId(file) {
        const { onFileUploadId } = this.props;
        if(file !== null && file !== undefined) { 
            const data = new FormData();
            data.append('file', file, file.name);
            const uploadFileApiUrl = `${FILE_API_URL}/excel/upload`; 
            this.setState({
                fileLoadingStatus : true
            });
            axios.post(uploadFileApiUrl, data) 
            .then(res => {
                this.setState({
                    fileLoadingStatus : false
                });
                onFileUploadId(res.data.data.uuid);
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    _onChange(e) {  
        this.props.onChange(e.target.value);
    }
    render() {
        const {type, inputTypeClassName, input} = this.props;
        const { filename ,fileLoadingStatus} = this.state;    
        return (
            <div className='input-field-container'>
            {
                type ?  type === 'file' ? 
                    <div className='file-upload'>
                        <div className='file-upload-content'> 
                            {filename} 
                        </div>
                        {
                            fileLoadingStatus ? <Loader/> 
                            :   <div className='file-upload-button'> 
                                    <label className='file-upload-button-text'> Browse 
                                        <span className='icon-long-arrow-right browse-icon'></span>
                                        <input
                                            {...input} 
                                            type = 'file'
                                            accept='.xls'
                                            onChange={(e) => this._onFileTypeChange(e)} />
                                    </label>
                                </div>
                        }
                        
                    </div> 
                    : <input {...input} type={type}  className={inputTypeClassName} onKeyUp={(e) => this._onChange(e)}></input> : ''
            }
            </div>
        )
    }
}

 
const mapStateToProps = ({uploadForm}) => {
    return {
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onFileUploadId(values) {
            dispatch(onFileUploadId(values))
        }
    };
};

const InputFieldWithApollo = withApollo(InputField);
export default connect( mapStateToProps, mapDispatchToProps)(withRouter(InputFieldWithApollo));
