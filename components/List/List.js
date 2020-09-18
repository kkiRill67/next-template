import Link from 'next/link'
import link from '../../styles/Link.module.scss'
import { useState, useEffect } from 'react'

export default function List({lists}) {

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
        {
            !lists.show ? <Link href={lists.id}><a>{lists.name}</a></Link> :
            <div><Link key={lists.id} href=''><a onClick={handleShow}>&rsaquo; {lists.name}</a></Link>
            <div className={!show ? link.show : link.hide}>{lists.links.map(p => {
                             return(
                                <Link key={p.id} href={p.id}><a> {p.name}</a></Link> 
                             )
                         })}</div>
            </div>
        }
      </div>
  )
}
