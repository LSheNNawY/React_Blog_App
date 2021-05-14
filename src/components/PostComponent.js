import React from 'react';
import {formatDate, formatTags} from "../helpers/generalFunctions";
import {Link} from "react-router-dom";

const PostComponent = ({data}) => {
    return (
        <div className="post col-xl-6">
            <div className="post-thumbnail"><Link to={`/${data.slug}`}>
                <img
                    src={data.image ? `${process.env.REACT_APP_API_URL}/uploads/${data.image}` : '/img/blog-post-3.jpeg'}
                    alt="..."
                    className=" img-thumbnail w-100" style={{height: '20rem'}}/></Link>
            </div>
            <div className="post-details">
                <div className="post-meta d-flex justify-content-between">
                    <div className="date meta-last">{formatDate(data.created_at)}</div>
                    <div className="category">{formatTags(data.tags)}</div>
                </div>
                <h3 className="h4">{data.title}</h3>
                <p className="text-muted">{data.body.length > 30 ? `${data.body.substr(0, 40)} ...` : data.body}</p>
                <footer className="post-footer d-flex align-items-center">
                    <Link to={"/profile"} className="author d-flex align-items-center flex-wrap">
                        <div className="avatar">
                            <img src={`/img/${data.owner.avatar}`} alt="..." className="img-fluid"/></div>
                        <div className="title"><span>{`${data.owner.firstName} ${data.owner.lastName}`}</span></div>
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default PostComponent;
