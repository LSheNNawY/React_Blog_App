import React, {useEffect, useState} from 'react';
import PostComponent from "./PostComponent";

const ajaxGetPosts = async (pageNumber, search = '') => {

    const data = await (await fetch(`${process.env.REACT_APP_API_URL}/posts?page=${pageNumber}&search=${search}`)).json();

    return data;
}

const PostsListComponent = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState([]);

    const pages = new Array(totalPages).fill(null).map((v, i) => i);

    const prevPage = (e) => {
        e.preventDefault()
        setPageNumber(pageNumber - 1)
    }
    const nextPage = (e) => {
        e.preventDefault()
        setPageNumber(pageNumber + 1)
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (searchText) {
            ajaxGetPosts(pageNumber, searchText).then(({totalPages, posts}) => {
                setPosts(posts);
                setTotalPages(totalPages);
            });
        }
    }


    useEffect(() => {
        ajaxGetPosts(pageNumber).then(({totalPages, posts}) => {
            setPosts(posts);
            setTotalPages(totalPages);
        });
    }, [pageNumber])

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="search-area">
                    <div className="search-area-inner d-flex align-items-center justify-content-center">
                        <div className="close-btn"><i className="icon-close"></i></div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                                <form action="#" onSubmit={handleSearch} className="search-form">
                                    <div className="form-group">
                                        <input type="search" name="search" id="search"
                                               onChange={(e) => setSearchText(e.target.value)}
                                               placeholder="What are you looking for?"/>
                                        <button type="submit" className="submit"><i className="icon-search-1"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="posts-listing col-lg-10 m-auto">
                <div className="row" style={{minHeight: '70%'}}>
                    {
                        posts.map(post => <PostComponent data={post} key={post._id}/>)
                    }
                </div>
                {/* Pagination */}
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-template d-flex justify-content-center mb-3">
                        <li className={`page-item  ${pageNumber === 0 ? 'disabled' : ''}`}>
                            <a href="" className={`page-link`} onClick={(e) => prevPage(e)}>
                                <i className="fa fa-angle-left"></i>
                            </a>
                        </li>

                        {
                            pages.map(pageIndex => (
                                <li className="page-item" key={pageIndex}>
                                    <a href="" className={`page-link ${pageNumber === pageIndex ? 'active' : ''}`}
                                       onClick={(e) => {
                                           e.preventDefault()
                                           setPageNumber(pageIndex)
                                       }}>{pageIndex + 1}
                                    </a>
                                </li>
                            ))
                        }

                        <li className={`page-item  ${pageNumber >= totalPages - 1 ? 'disabled' : ''}`}>
                            <a href='' className="page-link" onClick={(e) => nextPage(e)}>
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </main>
        </>
    );
};

export default PostsListComponent;
