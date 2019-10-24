import React, {Component} from 'react';
import './index.scss';

export default class TextArea extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            maxLimit : props.maxLimit,
            text:  props.noteDetails && props.noteDetails.length > 150 ? this._getNoteDetails(props) :  props.noteDetails 
        }
    }
    _getNoteDetails(props) {
        const {noteDetails, maxLimit } = props;
        const _text = noteDetails.length > maxLimit ? noteDetails.substring(0, (maxLimit-3))+'...' : noteDetails;
        return _text;
    }
    _onClick(e) {
        const length = e.target.value.length;
        const maxLimit = this.props.maxLimit;
        let _maxLimit = maxLimit - length;
        let _text = e.target.value;
        this.setState({
            maxLimit: _maxLimit,
            text : _text
        })
        this.props.onchange(_text)
    }
    render() {
        const { textAreaClassName, maxLimit, placeholder } = this.props;
        const {text} = this.state;
        return (
           <React.Fragment>
                <textarea 
                    rows="4" 
                    cols="75"
                    placeholder = {placeholder} 
                    className={textAreaClassName}
                    defaultValue={this.state.text} 
                    onKeyUp={(e) => this._onClick(e)} 
                    maxLength={maxLimit}/>
                { maxLimit > 0 ? <p className='max-limit'> {maxLimit-text.length}  characters remaining. </p> : null}
           </React.Fragment>
        )
    }
}
