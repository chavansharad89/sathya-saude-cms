import React ,{Component} from 'react';
import ApplicationCheckbox from '../ApplicationCheckbox'
import { withRouter } from 'react-router-dom';
import Toastr from '../../utils/Toastr'

class HorizontalCheckbox extends Component{
    
    constructor(props) {
        super(props);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.state={
            filterOptions:[
                {value:'All' , name:'All',isChecked:true},
                {value:'pending', name:'Pending',isChecked:true},
                {value:'approved', name:'Approved',isChecked:true},
                {value:'rejected', name:'Rejected',isChecked:true},
                {value: 'draft', name:'Draft',isChecked:true}
            ],
            superFilterOptions:[
                {value:'All' , name:'All',isChecked:true},
                {value:'pending', name:'Pending',isChecked:true},
                {value:'approved', name:'Approved',isChecked:true},
                {value:'rejected', name:'Rejected',isChecked:true},
               
            ],
            selectedFilterOptions:['pending','approved','rejected','draft'],
            superSelectedFilterOptions:['pending','approved','rejected'],
            selectedFilterOption:['pending','approved','rejected','draft'],
            superSelectedFilterOption:['pending','approved','rejected'],
           

        }
    }
    componentDidMount() {
        this.unlisten =  this.props.history.listen( location =>  {
            this.reset();
        });  
    }
    componentWillUnmount() {
        this.unlisten(); 

    }
    reset(){
        this.setState(()=>{
            return{  
                filterOptions:[
                    {value:'All' , name:'All',isChecked:true},
                    {value:'pending', name:'Pending',isChecked:true},
                    {value:'approved', name:'Approved',isChecked:true},
                    {value:'rejected', name:'Rejected',isChecked:true},
                    {value: 'draft', name:'Draft',isChecked:true}
                ],
                superFilterOptions:[
                    {value:'All' , name:'All',isChecked:true},
                    {value:'pending', name:'Pending',isChecked:true},
                    {value:'approved', name:'Approved',isChecked:true},
                    {value:'rejected', name:'Rejected',isChecked:true},
                
                ],
                selectedFilterOptions:['pending','approved','rejected','draft'],
                superSelectedFilterOptions:['pending','approved','rejected']
            }
        })
        const {selectedFilterOption,superSelectedFilterOption}= this.state
        const selectedFilter=this.props.role==='admin' ?selectedFilterOption:superSelectedFilterOption
        this.props.onCheckboxChange(selectedFilter)
        

    }
    
    onCheckboxChange(clickedOption, isChecked, index){
        if(this.props.role==='admin') {
            if(!(clickedOption.value === 'All' && this.state.selectedFilterOptions.length === 4)) {
                this.setState((previousState) =>{
                    return {
                        ...previousState,
                        filterOptions: this._updateFilterOptions(previousState.filterOptions,
                            previousState.selectedFilterOptions, 
                            index, 
                            isChecked),
                        selectedFilterOptions:this._selectedFilterOptions(previousState.filterOptions,
                            previousState.selectedFilterOptions,
                            clickedOption)
                    }
                })
              
                this.setState((previousState) =>  {
                    if(!(previousState.selectedFilterOptions.length === 1 && 
                        previousState.filterOptions[index].value ===previousState.selectedFilterOptions[0])){
                        this.loadData(previousState.selectedFilterOptions)
                    }
                })   
            }
        
        }   
        else{
            if(!(clickedOption.value === 'All' && this.state.superSelectedFilterOptions.length === 3)) {
                this.setState((previousState) => {
                    return {
                        ...previousState,
                        superFilterOptions: this._updateFilterOptions(previousState.superFilterOptions,
                            previousState.superSelectedFilterOptions, 
                            index, 
                            isChecked),
                        superSelectedFilterOptions: this._selectedFilterOptions(previousState.superFilterOptions,
                            previousState.superSelectedFilterOptions,
                            clickedOption)
                    }   
                })
               
                this.setState((previousState) =>  {
                    if(!(previousState.superSelectedFilterOptions.length === 1 && 
                        previousState.superFilterOptions[index].value ===previousState.superSelectedFilterOptions[0])){
                        this.loadData(previousState.superSelectedFilterOptions)
                    }
                    return ''
                })
            } 
            return ''
        }
         
    }
    loadData(selectedFilter){
        // this.props.tableLoadingStatus(true)
        this.props.onCheckboxChange(selectedFilter)
        this.props.onMyuploadsChecked &&  this.props.onMyuploadsChecked()
        this.props.onAlluploadsChecked &&  this.props.onAlluploadsChecked()  
        
    }
    _selectedFilterOptions(filterOptions,_selectedFilterOptions,clickedOption ) {
        let index =_selectedFilterOptions &&_selectedFilterOptions.indexOf(clickedOption.value)
        if(clickedOption.value==='All'){
            const allOptions=  filterOptions.filter(({value},index) => {
                if(index>0){
                    return value
                }
                return ''
            })
            
            return allOptions.map((values)=> values.value)
        }
        else{
            if(!(_selectedFilterOptions.length===1 && clickedOption.value===_selectedFilterOptions[0])){
                if( index === -1 && clickedOption.isChecked ){
                    return  _selectedFilterOptions.concat(clickedOption.value)
                }
                else{
                    return _selectedFilterOptions.filter(value => !(value===clickedOption.value) )
                }
            }
            else{
                return _selectedFilterOptions
            }  
        }
    }

    _updateFilterOptions(filterOptions, _selectedFilterOptions,index, isChecked) {
        const no =this.props.role ==='admin' ? 3 : 2
        if(!(index ===0)){
            if(!(_selectedFilterOptions.length === 1 && filterOptions[index].value ===_selectedFilterOptions[0])){
                if(_selectedFilterOptions.length===no && isChecked){
                    filterOptions[index].isChecked =  isChecked;
                    filterOptions[0].isChecked = true; 
                }
                else {
                    filterOptions[index].isChecked = isChecked;
                    filterOptions[0].isChecked = false;   
                }
            }  else{
                Toastr.error("At Least one Option has to be selected")
            }  
        }
        else{
            filterOptions=filterOptions.map((value,index) =>{
                return{  
                      ...value,
                    isChecked:true
                }
            })
        }
      
        return filterOptions;
    }
   
    render(){
        const {filterOptions,
            superFilterOptions,
            selectedFilterOptions,
            superSelectedFilterOptions}=this.state
        const {role}=this.props
        const options = role==='admin' ? filterOptions: superFilterOptions
        const selectedOptions= role==='admin' ? selectedFilterOptions : superSelectedFilterOptions;
        return (
            <ApplicationCheckbox 
                filterOptions={options} 
                onChange={this.onCheckboxChange} 
                type={'horizontal'} 
                selectedOption={'All'}
                selectedFilterOptions={selectedOptions}
                />
        )
    }
}

export default (withRouter(HorizontalCheckbox));