import useSWR from 'swr'
import sidebar from '../../styles/Sidebar.module.scss'
import List from '../List/List'
import ApiRef from '../ApiRef/ApiRef'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Sidebar(props) {
    const { data, error } = useSWR('/api/list', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const styles = {
        display: 'block',
    }

    const {show} = props 
    return (
        <aside>
            <div className={sidebar.wrap} style={show ? styles : null}>
                <h3>Документация</h3>
                {
                    data.map((p, i) => (<List key={i} lists={p} />))
                }
                <ApiRef />
            </div>
            
        </aside>
    )
}