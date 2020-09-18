import Menu from '../Menu/Menu'
import Sidebar from '../Sidebar/Sidebar'
import docs from '../../styles/Docs.module.scss'

export default function Docs(props) {
    return (
        <div>
            <Menu />
            <div className={docs.main}>
                <Sidebar name={props.name}/>
                <main className={docs.description}>
                    {props.children}
                </main>
            </div>
        </div>
    )
}