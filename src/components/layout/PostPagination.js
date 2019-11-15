import React from "react";

function PostPagination(props) {
  const previous = props.previousPage ? (
    <li className="page-item">
      <a
        className="page-link"
        href={props.previousPage}
        onClick={event => props.paginatePost(event, props.previousPage)}
      >
        Previous
      </a>
    </li>
  ) : (
    ""
  );

  const next = props.nextPage ? (
    <li className="page-item">
      <a
        className="page-link"
        href={props.nextPage}
        onClick={event => props.paginatePost(event, props.nextPage)}
      >
        Next
      </a>
    </li>
  ) : (
    ""
  );

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {previous}
          <li className="page-item active">
            <a className="page-link" href="#/" onClick={(e) => { e.preventDefault() }}>
              {props.currentPage}
            </a>
          </li>
          {next}
        </ul>
      </nav>
    </div>
  );
}

export default PostPagination;
