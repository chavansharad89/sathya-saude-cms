import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parseDateToServerDate } from '../../utils/DateFormat';
import './index.scss';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysOptions: [],
            monthsOptions: [],
            yearOptions: [],
            selectedDay: props.selectedValues && props.selectedValues.day ? props.selectedValues.day : '',
            selectedMonth: props.selectedValues && props.selectedValues.month >= 0 ? props.selectedValues.month : '',
            selectedYear: props.selectedValues && props.selectedValues.year ? props.selectedValues.year : '',
            date: ''
        }
    }

    componentWillMount() {
        const daysOptions = this._getDaysOptions();
        const monthsOptions = this._getMonthsOptions();
        const yearOptions = this._getYearsOptions();
        this.setState({
            ...this.state,
            daysOptions: [...daysOptions],
            monthsOptions: [...monthsOptions],
            yearOptions: [...yearOptions]
        });
    }

    onDayChange = (day) => {
        if (day) {
            const change = {
                ...this.state,
                selectedDay: day,
            };
            this.setState({ ...change });
            this.callOnChangeIfDateIsValid({ ...change });
        }
    }

    onMonthChange = (month) => {
        if (month) {
            let change = {
                ...this.state,
                selectedMonth: month,
            };
            const daysOptions = this._getDaysOptions(this.state.monthsOptions[month].days);
            change = {
                ...change,
                selectedDay: '',
                daysOptions: [...daysOptions]
            };
            this.setState({ ...change });
            this.callOnChangeIfDateIsValid({ ...change });
        }
    }

    onYearChange = (year) => {
        if (year) {
            const change = {
                ...this.state,
                selectedYear: year,
            };
            this.setState({ ...change });
            this.callOnChangeIfDateIsValid({ ...change });
        }
    }

    callOnChangeIfDateIsValid = ({
        selectedMonth,
        selectedDay,
        selectedYear
    }) => {
        if (this._checkAllDateValueIsEntered({ selectedMonth, selectedDay, selectedYear })) {
            const month = (parseInt(selectedMonth) + 1) < 10 ? `0${(parseInt(selectedMonth) + 1)}` : (parseInt(selectedMonth) + 1);
            const day = (parseInt(selectedDay)) < 10 ? `0${(parseInt(selectedDay))}` : (parseInt(selectedDay));

            let date = `${selectedYear}-${month}-${day}`;
            date = parseDateToServerDate(date);
            this.props.onChange(date);
        }
    }

    _checkAllDateValueIsEntered = ({
        selectedDay,
        selectedMonth,
        selectedYear
    }) => {
        return (selectedDay && selectedMonth !== '' && selectedYear) ? true : false;
    }

    _getMonthsOptions = () => {
        let monthsOptions = [];
        let months = [
            {
                value: 'Jan',
                days: 31
            },
            {
                value: 'Feb',
                days: 28
            },
            {
                value: 'Mar',
                days: 31
            },
            {
                value: 'Apr',
                days: 30
            },
            {
                value: 'May',
                days: 31
            },
            {
                value: 'Jun',
                days: 30
            },
            {
                value: 'Jul',
                days: 31
            },
            {
                value: 'Aug',
                days: 31
            },
            {
                value: 'Sep',
                days: 30
            },
            {
                value: 'Oct',
                days: 31
            },
            {
                value: 'Nov',
                days: 30
            },
            {
                value: 'Dec',
                days: 31
            }
        ];
        monthsOptions = months.map((month, index) => 
            ({ label: month.value, value: index, days: month.days })
        );
        return monthsOptions;
    }

    _getDaysOptions = (days = 31) => {
        let daysOptions = [];
        for (let i = 1; i <= days; i++) {
            daysOptions.push({ label: i, value: i });
        }
        return daysOptions;
    }

    _getYearsOptions = () => {
        let yearOptions = [];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1900; i--) {
            yearOptions.push({ label: i, value: i });
        }
        return yearOptions;
    }
    
    render() {
        const { daysOptions, 
            monthsOptions, 
            yearOptions, 
            selectedMonth, 
            selectedDay, 
            selectedYear } = this.state;
        return ( 
            <div className='date-picker'>
               <select 
                    className = 'date-picker__month' 
                    value = {selectedMonth} 
                    onChange={(e) => this.onMonthChange(e.target.value)}>
                    <option value="">{'MM'}</option>
                    {
                        monthsOptions.map(({label, value}, index) => 
                            <option key = {index} value = {value}> {label} </option>
                        )
                    }
                </select>
                <select 
                    className = 'date-picker__day' 
                    value={selectedDay}
                    onChange = {(e) => this.onDayChange(e.target.value)}>
                    <option value="">{'DD'}</option>
                    {
                        daysOptions.map(({label, value}, index) => 
                            <option key = {index} value = {value}> {label} </option>
                        )
                    }
                </select>
                <select 
                    className = 'date-picker__year' 
                    value={selectedYear}
                    onChange = {(e) => this.onYearChange(e.target.value)}>
                    <option value="">{'YYYY'}</option>
                    {
                        yearOptions.map(({label, value}, index) => 
                            <option key = {index} value = {value}> {label} </option>
                        )
                    }
                </select>
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
        
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(DatePicker);
