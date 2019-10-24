import React ,{Component} from 'react';
import ApplicationAccordian from '../ApplicationAccordian';
import ApplicationRadioButton from '../ApplicationRadioButton';
import ApplicationOutsideClick from '../ApplicationOutsideClick';
import './index.scss';

export default class ApplicationDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.fiscalYear ? 
                { displayName: props.fiscalYear 
                    || props.fiscalYear.value , id: props.fiscalYear 
                    || props.fiscalYear.fiscalYearId } 
                : {displayName: 'Select Fiscal Year' , id:0},
            selectedOption: props.fiscalYear  ? props.fiscalYear  : 'Select Fiscal Year',
            dropdownoptions: props.dropdownoptions,
            isOpen : false,
        }
    }
    componentDidMount(){
        this.setState({
            title: this.props.fiscalYear ?  
                { displayName: this.props.fiscalYear 
                    || this.props.fiscalYear.value , id: this.props.fiscalYear 
                    || this.props.fiscalYear.fiscalYearId } 
                : {displayName: 'Select Fiscal Year' , id:0} ,
            selectedOption: this.props.fiscalYear  ? 
                this.props.fiscalYear || this.props.fiscalYear.value 
                : 'Select Fiscal Year',
            dropdownoptions :this.props.dropdownoptions,
            isOpen:false,
        })
    }
    isOpenSubmenu(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onRadioButtonChange(value){
        this.setState({
            title:{ displayName:value.value, id:value.value },
            selectedOption:value.value,
            isOpen: false
        });
        this.props.onChange(value.value)
    }
    onOutsideClick(){
        this.setState({
            isOpen: false
        })
    }
    render(){
        const { title, isOpen , dropdownoptions } = this.state;
        const className ='dropdown-bar';
        const bodyClassName='dropdown-body';
        const body= <ApplicationRadioButton 
            options = {dropdownoptions} 
            selectedOption = {this.props.fiscalYear} 
            onChange={this.onRadioButtonChange.bind(this)} />
        return (
            <React.Fragment>
                <div className='table-filter'>
                    <ApplicationOutsideClick onOutsideClick= {this.onOutsideClick.bind(this)}>
                        <ApplicationAccordian 
                            title={title} 
                            bodyClassName={bodyClassName} 
                            body ={body} 
                            className={className} 
                            isOpenSubmenu={this.isOpenSubmenu.bind(this)} isOpen={isOpen}/>
                    </ApplicationOutsideClick>
                </div>
            </React.Fragment>
        )
    }
}
