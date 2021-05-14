import React from "react";
import {toast} from "react-toastify";

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', {month: 'short'})
    return `${month} ${date.getFullYear()}`
}

export const formatTags = (data) => {
    if (data) {
        const tags = data.trim().split(" ");
        return tags.map((tag, index) => {
            return <h5 key={index} className="mr-1 badge badge-warning font-weight-bold p-1"
                       style={{fontSize: '0.8rem'}}> #{tag}</h5>
        })
    }
}


export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const notify = (message, type, history = null, to = null) => toast(message, {
    onClose: () => history? history.push(to) : '',
    type: type === 'success' ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
})



