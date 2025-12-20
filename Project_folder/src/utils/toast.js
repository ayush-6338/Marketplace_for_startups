
import { toast } from 'react-hot-toast';

export const showSuccess = (message = 'Done') => {
    toast.success(message);
};

export const showError = (message = 'Something went wrong') => {
    toast.error(message);
};

export const showInfo = (message = 'Please try again') => {
    toast(message);
};
