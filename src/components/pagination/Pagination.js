import React, { useState } from 'react';
import styles from './Pagination.module.scss'

function Pagination({currentPage, setCurrentPage, productsPerPage, totalProducts}) {
    const pageNumbers = []
    const totalPages = totalProducts / productsPerPage

    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumnerLimit] = useState(0)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const paginateNext = () => {
        setCurrentPage(currentPage + 1)
        // Show Next set of page numbers
        if(currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumnerLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const paginatePrev = () => {
        setCurrentPage(currentPage - 1);
        // Show prev set of pageNumbers
        if((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumnerLimit(minPageNumberLimit - pageNumberLimit)
        }
    }


    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className={styles.pagination}>
            <li 
            onClick={paginatePrev} 
            className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}>Prev</li>

             {pageNumbers.map((number) => {
                if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                    return (
                        <li 
                        key={number}
                        className={currentPage === number ? `${styles.active}` : null}
                         onClick={() => paginate(number)}>{number}</li>
                    )
                }
             })}

            <li 
            className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : null}
            onClick={paginateNext}
            >Next</li>
            <p>
                <b className={styles.page}>{`page ${currentPage}`}</b>
                <span>{` of `}</span>
                <b>{`${Math.ceil(totalPages)}`}</b>
            </p>
        </ul>
    );
}

export default Pagination;