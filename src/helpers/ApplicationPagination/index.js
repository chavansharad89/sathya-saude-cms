import React from "react";
import Pagination from "react-pagination-library";
import './index.scss'
import "react-pagination-library/build/css/index.css"; //for css

class pagination extends React.Component {
  _onPaginate=(id)=>{
    if(!(this.props.pageId===id)){
      this.props.onPaginate(id)
      this.props.onAlluploadsPaginationClicked && this.props.onAlluploadsPaginationClicked();
      this.props.onMyuploadsPaginationClicked && this.props.onMyuploadsPaginationClicked();
    }
  } 
  render() {
    const{pageId,total}=this.props
    
    return (
      <div className='paginate'>
        <Pagination
          currentPage={pageId}
          totalPages={total}
          changeCurrentPage={this._onPaginate}
          theme="bottom-border"
        />
      </div>
    );
  }
}
export default pagination;