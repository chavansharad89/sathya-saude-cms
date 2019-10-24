import Toastr from '../../utils/Toastr'

const defaultState = {
    filterOptions:[
        {value:'All' , name:'All',isChecked:true},
        {value:'pending', name:'Pending',isChecked:true},
        {value:'approved', name:'Approved',isChecked:true},
        {value:'rejected', name:'Rejected',isChecked:true},
        {value: 'draft', name:'Draft',isChecked:true}
    ],
    selectedFilterOptions:['pending','approved','rejected','draft']
};

const ON_RESET='ON_RESET'
const ON_CHECKBOX_CHANGE ='ON_CHECKBOX_CHANGE'


function onReset() {
    return {
        type: ON_RESET
    }
}
function onCheckboxFiletrChange(clickedOption, isChecked, index){
    return{
        type: ON_CHECKBOX_CHANGE,
        clickedOption, 
        isChecked, 
        index
    }
}
function _selectedFilterOptions(filterOptions,_selectedFilterOptions,clickedOption ) {
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

function _updateFilterOptions(filterOptions, _selectedFilterOptions,index, isChecked) {
    if(!(index ===0)){
        if(!(_selectedFilterOptions.length===1 && filterOptions[index].value===_selectedFilterOptions[0])){
            if(_selectedFilterOptions.length===3 && isChecked){
                filterOptions[index].isChecked =  isChecked;
                filterOptions[0].isChecked=true; 
            }
            else {
                filterOptions[index].isChecked =  isChecked;
                filterOptions[0].isChecked=false; 
            }
        }  else{
            Toastr.error("At Least one Option has to be selected") 
            // alert("At Least one Option has to be selected")
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

const checkbox = (state = defaultState, action) => {
    switch (action.type) {
        case ON_RESET:
            return {
                ...defaultState
            };
        case ON_CHECKBOX_CHANGE:
            if(!(action.clickedOption.value === 'All' && state.selectedFilterOptions.length === 4)) {
               
                    return {
                        ...state,
                        filterOptions: _updateFilterOptions(state.filterOptions,state.selectedFilterOptions, action.index, action.isChecked),
                        selectedFilterOptions:_selectedFilterOptions(state.filterOptions,state.selectedFilterOptions,action.clickedOption)
                    }
                
            }
            return '';
        default:
            return state;
    }
};

export {
    checkbox,
    onReset,
    onCheckboxFiletrChange
};
