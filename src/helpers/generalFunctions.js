import React from "react";

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

