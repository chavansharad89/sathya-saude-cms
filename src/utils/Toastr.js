import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
    positionClass: window.innerWidth <= 768 ? 'toast-bottom-full-width' : 'toast-`  `-left',
    hideDuration: 300,
    timeOut: 3000
}

export default toastr;