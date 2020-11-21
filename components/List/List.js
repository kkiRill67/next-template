import Link from 'next/link'
import { useRouter } from 'next/router'
import link from '../../styles/Link.module.scss'
import React, { useState, useEffect, useMemo } from 'react'

import styles from './List.module.css'

function List({ lists }) {
    const router = useRouter()

    const [show, setShow] = useState(true)
    const [name, setName] = useState(lists.name)

    const handleShow = () => {
      setShow(localStorage.setItem(name, JSON.stringify(!show)))
    }

    useEffect(() => {
      const checkout = JSON.parse(localStorage.getItem(name)) ? JSON.parse(localStorage.getItem(name)) : false
      setShow(checkout)
    }, [show])
    
  return (
      <div className={link.link}>
        {console.log(router.route)}
        {console.log(lists)}
        {
            lists.show === false ? <Link href={lists.id}><a className={router.route === lists.id ? styles.activeLink : ''}>{lists.name}</a></Link> :
        <div><Link key={lists.id} href=''><a onClick={handleShow}>{show === false ? <span>&rsaquo;</span> : <span>&darr;</span>} {lists.name}</a></Link>
            <div className={show === true ? link.show : link.hide}>{lists.links.map(p => {
                             return(
                                <Link key={p.id} href={p.id}>
                                  <a className={router.route === p.id ? styles.activeLink : ''} > {p.name}</a>
                                </Link> 
                             )
                         })}</div>
            </div>
        }
      </div>
  )
}

export default React.memo(List)
