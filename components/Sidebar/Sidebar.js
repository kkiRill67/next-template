import useSWR from 'swr'
import sidebar from '../../styles/Sidebar.module.scss'
import List from '../List/List'
import ApiRef from '../ApiRef/ApiRef'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Sidebar() {
    const { data, error } = useSWR('/api/list', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <aside className={sidebar.wrap}>
            <h3>Документация</h3>
            {
                data.map((p, i) => (<List key={i} lists={p} />))
            }
            <ApiRef />
        </aside>
    )
}