import { useState } from 'react'
import Menu from '../Menu/Menu'
import Sidebar from '../Sidebar/Sidebar'
import docs from '../../styles/Docs.module.scss'

export default function Docs(props) {

    const [show, setShow] = useState(false)

    function onShow(bool) {
        setShow(bool)
    }

    return (
        <div>
            <Menu onShow={(bool) => onShow(bool)} show={show} />
            <div className={docs.main}>
                <Sidebar name={props.name} show={show}/>
                <main className={docs.description}>
                    {props.children}
                </main>
            </div>
        </div>
    )
}